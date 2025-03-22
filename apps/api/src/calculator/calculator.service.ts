import { Injectable } from '@nestjs/common';
import yahooFinance from 'yahoo-finance2';
import { HistoricalOptionsEventsHistory } from 'yahoo-finance2/dist/esm/src/modules/historical';

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
  }) {
    const query = symbol[0] as string;
    const queryOptions: HistoricalOptionsEventsHistory = {
      period1: date1,
      period2: date2,
      interval: '1mo',
    };
    const historicalData = await yahooFinance.historical(query, queryOptions);

    // method 1 : 거치식
    function calculateLSI(investmentAmount, stockPrices) {
      const totalInvestment = investmentAmount;
      const firstPrice = stockPrices[0];
      const lastPrice = stockPrices[stockPrices.length - 1];
      const profitRate = lastPrice / firstPrice;
      const currentValue = investmentAmount * profitRate;

      return {
        totalInvestment,
        currentValue,
      };
    }

    // method 2 : 적립식
    function calculateDCA(investmentAmount, stockPrices) {
      const totalInvestment = investmentAmount * stockPrices.length; // 총 투자금
      const lastPrice = stockPrices[stockPrices.length - 1];
      let totalShares = 0; // 총 매수 주식 수

      // 각 월별 주가에 따른 매수량 계산
      stockPrices.forEach((price) => {
        totalShares += investmentAmount / price;
      });

      const currentValue = totalShares * lastPrice; // 현재 평가금액

      return {
        totalInvestment,
        currentValue,
      };
    }

    const prices = historicalData.map((el) => el.adjClose as number);
    const calculateFn = method === 1 ? calculateLSI : calculateDCA;
    const { totalInvestment, currentValue } = calculateFn(amount, prices);

    const fixedCurrentValue = Math.floor(currentValue);
    const profit = fixedCurrentValue - totalInvestment;
    const profitPercent = parseFloat(
      ((profit / totalInvestment) * 100).toFixed(2),
    ); // 수익률(%)

    return {
      totalInvestment,
      currentValue: fixedCurrentValue,
      profit,
      profitPercent,
    };
  }
}
