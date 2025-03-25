import { formatKoreanCurrency } from "@/lib/format";
import { CalculatorResult } from "@/types/calculator";
import { Card, CardContent } from "@repo/ui/components/card";

interface ResultInfoProps extends React.ComponentProps<"div"> {
  result: CalculatorResult;
}

export function ResultInfo({ result, ...props }: ResultInfoProps) {
  return (
    <Card {...props}>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div>{`손익금액 : ${formatKoreanCurrency(result.profit)}`}</div>
        </div>
      </CardContent>
    </Card>
  );
}
