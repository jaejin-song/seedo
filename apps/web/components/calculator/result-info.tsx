import { formatKoreanCurrency, formatNumberSign } from "@/lib/format";
import { CalculatorResult } from "@/types/calculator";
import { Card, CardContent } from "@repo/ui/components/card";
import { cn } from "@repo/ui/lib/utils";
import { format } from "date-fns";

interface ResultInfoProps extends React.ComponentProps<"div"> {
  result: CalculatorResult;
}

export function ResultInfo({ result, ...props }: ResultInfoProps) {
  const formatAmount = (val: number) => {
    return `${val.toLocaleString()}원 (${formatKoreanCurrency(val)})`;
  };

  const formatMonths = (months: number) => {
    if (months <= 12) return `${months}개월`;

    const year = Math.floor(months / 12);
    const month = months % 12;

    return `${year}년 ${month}개월`;
  };

  const getDurationText = (start: Date, end: Date, months: number) => {
    const startDate = format(start, "yyyy년 MM월 dd일");
    const endDate = format(end, "yyyy년 MM월 dd일");

    const monthText = formatMonths(months);

    return `${startDate} ~ ${endDate} ( ${monthText} )`;
  };

  return (
    <Card {...props}>
      <CardContent>
        <div className="flex flex-col gap-10">
          <h2 className="text-4xl font-semibold leading-14">
            계산 결과, 투자자님의 손익금액은
            <br />
            <span
              className={cn(
                "text-4xl font-semibold",
                result.profit >= 0 ? "text-red-500" : "text-blue-500"
              )}
            >
              {`${formatKoreanCurrency(result.profit)}`}
            </span>
            입니다.
          </h2>
          <p>
            {`가입기간 : ${getDurationText(result.startDate, result.endDate, result.duration)}`}
          </p>
          <table className="border-collapse border border-gray-400">
            <thead>
              <tr>
                <th className="border light:border-gray-300 text-lg font-medium text-left px-5 py-3 bg-neutral-100 dark:bg-neutral-800">
                  투자금액
                </th>
                <th className="border light:border-gray-300 text-lg font-medium text-left px-5 py-3 bg-neutral-100 dark:bg-neutral-800">
                  평가금액 / 수익률
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border light:border-gray-300 px-5 py-3 text-lg text-muted-foreground">
                  {formatAmount(result.totalInvestment)}
                </td>
                <td className="border light:border-gray-300 px-5 py-3 text-lg text-muted-foreground">
                  <span>{`${formatAmount(result.currentValue)} / `}</span>
                  <span
                    className={cn(
                      result.profitPercent >= 0
                        ? "text-red-500"
                        : "text-blue-500"
                    )}
                  >
                    {`${formatNumberSign(result.profitPercent)}%`}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
