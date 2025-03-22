import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Separator } from "@repo/ui/components/separator";
import { Input } from "@repo/ui/components/input";
import { useCalculatorStore } from "@/store/useCalculatorStore";

export function PeriodAmountCard() {
  const form = useCalculatorStore((state) => state.form);

  return (
    <Card className="w-sm">
      <CardHeader>
        <CardTitle>투자 기간</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>

      <CardContent className="my-3">
        <Separator />
      </CardContent>

      <CardHeader>
        <CardTitle>투자 금액</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="투자금액을 입력해주세요" />
      </CardContent>
    </Card>
  );
}
