export interface CalculatorResult {
  totalInvestment: number;
  currentValue: number;
  profit: number;
  profitPercent: number;
  startDate: Date;
  endDate: Date;
  duration: number;
  investmentHistory: InvestmentHistory[];
}

export interface InvestmentHistory {
  date: string;

  // portfolio
  return: number;
  returnPercent: number;
  currentValue: number;
  profit: number;

  // voo
  baseReturn: number;
  baseReturnPercent: number;
  baseCurrentValue: number;
  baseProfit: number;
}
