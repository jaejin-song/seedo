import { Controller, Get, Query } from '@nestjs/common';
import { CalculatorService } from './calculator.service';
import { parse } from 'date-fns';

@Controller('calculator')
export class CalculatorController {
  constructor(private readonly calculatorService: CalculatorService) {}

  @Get()
  async getResult(
    @Query('amount') amount: string,
    @Query('date') date: string,
    @Query('method') method: string,
    @Query('symbol') symbol: string,
    @Query('percent') percent: string,
  ) {
    const [date1, date2] = date.split(',') as [string, string];
    const parsedSymbol = symbol.split(',');
    const parsedPercent = percent.split(',').map((el) => parseInt(el));

    const data = await this.calculatorService.getResult({
      amount: parseInt(amount),
      date1: parse(date1, 'yyyy.MM.dd', new Date()),
      date2: parse(date2, 'yyyy.MM.dd', new Date()),
      method: parseInt(method),
      symbol: parsedSymbol,
      percent: parsedPercent,
    });

    return {
      success: true,
      data,
    };
  }
}
