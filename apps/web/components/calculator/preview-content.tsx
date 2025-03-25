import { formatKoreanCurrency } from "@/lib/format";
import { useCalculatorStore } from "@/store/useCalculatorStore";
import { Separator } from "@repo/ui/components/separator";
import { differenceInCalendarMonths, format } from "date-fns";
import { useWatch } from "react-hook-form";

const METHOD_LABEL = {
  "1": "거치식",
  "2": "적립식",
} as const;

export function PreviewContent() {
  const form = useCalculatorStore((state) => state.form);

  const { method, startDate, endDate, amount, product } = useWatch({
    control: form?.control,
  });

  const formatDuration = (start: Date, end: Date) => {
    return `${format(start, "yyyy.MM.dd")} ~ ${format(end, "yyyy.MM.dd")}`;
  };

  const formatAmount = (val: number) => {
    const betweenMonth = differenceInCalendarMonths(
      endDate || new Date(),
      startDate || new Date()
    );
    const totalAmount = method === "1" ? val : val * betweenMonth;
    return `월 ${formatKoreanCurrency(val)} (총 ${formatKoreanCurrency(totalAmount)})`;
  };

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm font-semibold">
            투자유형
          </span>
          <span className="text-sm font-semibold">
            {METHOD_LABEL[method || 1]}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm font-semibold">
            투자기간
          </span>
          <span className="text-sm font-semibold">
            {formatDuration(startDate || new Date(), endDate || new Date())}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm font-semibold">
            투자금액
          </span>
          <span className="text-sm font-semibold">
            {formatAmount(amount || 0)}
          </span>
        </div>
      </div>

      <Separator className="bg-neutral-500 my-1 mx-4" orientation="vertical" />

      <div className="flex flex-col gap-2">
        <span className="text-muted-foreground text-base font-semibold">
          선택한 상품
        </span>
        <div>{product?.map((el) => el.name).join("")}</div>
      </div>
    </div>
  );
}
