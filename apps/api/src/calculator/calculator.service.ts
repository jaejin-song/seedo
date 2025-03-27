import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import { formatAmount, formatPercent } from 'src/common/utils/format.util';
import yahooFinance from 'yahoo-finance2';
import { HistoricalOptionsEventsHistory } from 'yahoo-finance2/dist/esm/src/modules/historical';
import {
  CalculateFn,
  CalculatorResultDto,
  InvestmentHistory,
  StockReturn,
} from './types/calculator.types';

@Injectable()
export class CalculatorService {
  async getResult({
    amount,
    date1,
    date2,
    method,
    symbol,
    // percent,
  }: {
    amount: number;
    date1: Date;
    date2: Date;
    method: number;
    symbol: string[];
    percent: number[];
  }): Promise<CalculatorResultDto> {
    // method 1 : 거치식
    const calculateLSI: CalculateFn = (investAmount, quotes) => {
      const stockReturns: StockReturn[] = [];
      const totalInvest = investAmount;

      const firstPrice = quotes[0]!.price;
      const totalShares = totalInvest / firstPrice;

      for (const quote of quotes) {
        const { date, price } = quote;

        const currentValue = totalShares * price;
        const profit = currentValue - totalInvest;
        const stockReturn = profit / totalInvest;

        stockReturns.push({
          date: format(date, 'yyyy.MM'),
          return: stockReturn,
          returnPercent: formatPercent(stockReturn),
          currentValue: formatAmount(currentValue),
          profit: formatAmount(profit),
        });
      }

      return {
        totalInvest,
        stockReturns,
      };
    };

    // method 2 : 적립식
    const calculateDCA: CalculateFn = (investAmount, quotes) => {
      const stockReturns: StockReturn[] = [];
      let totalInvest = 0;
      let totalShares = 0;

      for (const quote of quotes) {
        const { date, price } = quote;

        const shares = investAmount / price;
        totalShares += shares;
        totalInvest += investAmount;

        const currentValue = totalShares * price;
        const profit = currentValue - totalInvest;
        const stockReturn = profit / totalInvest;

        stockReturns.push({
          date: format(date, 'yyyy.MM'),
          return: stockReturn,
          returnPercent: formatPercent(stockReturn),
          currentValue: formatAmount(currentValue),
          profit: formatAmount(profit),
        });
      }

      return {
        totalInvest,
        stockReturns,
      };
    };

    const doCalculate = async (symbol: string) => {
      const queryOptions: HistoricalOptionsEventsHistory = {
        period1: date1,
        period2: date2,
        interval: '1mo',
      };
      const historicalData = await yahooFinance.historical(
        symbol,
        queryOptions,
      );

      const quotes = historicalData.map((el) => ({
        date: el.date,
        price: el.adjClose as number,
      }));

      const calculateFn = method === 1 ? calculateLSI : calculateDCA;
      return calculateFn(amount, quotes);
    };

    // 유저가 요청한 데이터
    const { totalInvest, stockReturns } = await doCalculate(
      symbol[0] as string,
    );

    // 비교를 위한 데이터
    const { stockReturns: VOO_StockReturns } = await doCalculate('VOO');

    const {
      currentValue: lastCurrentValue,
      profit: lastProfit,
      returnPercent: lastReturnPercent,
    } = stockReturns[stockReturns.length - 1]!;

    const investmentHistory: InvestmentHistory[] = stockReturns.map(
      (el, index) => {
        const voo = VOO_StockReturns[index]!;

        return {
          ...el,
          baseReturn: voo.return,
          baseReturnPercent: voo.returnPercent,
          baseCurrentValue: voo.currentValue,
          baseProfit: voo.profit,
        };
      },
    );

    return {
      totalInvestment: totalInvest,
      currentValue: lastCurrentValue,
      profit: lastProfit,
      profitPercent: lastReturnPercent,
      startDate: date1,
      endDate: date2,
      duration: stockReturns.length,
      investmentHistory: investmentHistory,
    };
  }
}
