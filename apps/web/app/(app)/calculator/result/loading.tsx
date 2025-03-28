import CalculatorLayout from "@/components/calculator-layout";
import { Skeleton } from "@repo/ui/components/skeleton";

export default function Loading() {
  return (
    <CalculatorLayout title="수익률 계산 결과">
      <div className="flex justify-center">
        <div className="flex flex-col gap-6 w-4xl">
          <Skeleton className="h-[125px] rounded-xl shadow-sm" />
          <Skeleton className="h-[125px] rounded-xl shadow-sm" />
          <div className="flex justify-center gap-6">
            <Skeleton className="h-10 w-20 shadow-sm rounded-md" />
            <Skeleton className="h-10 w-20 shadow-sm rounded-md" />
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
}
