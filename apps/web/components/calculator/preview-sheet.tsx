"use client";

import { useCalculatorStore } from "@/store/useCalculatorStore";
import { PreviewContent } from "./preview-content";
import { Button } from "@repo/ui/components/button";
import { useWatch } from "react-hook-form";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

export function PreviewSheet() {
  const { step, setStep, form } = useCalculatorStore();

  const { product } = useWatch({ control: form?.control });

  const router = useRouter();
  const handleNavigation = () => {
    if (!form) return;

    const startDate = format(form.getValues("startDate"), "yyyy.MM.dd");
    const endDate = format(form.getValues("endDate"), "yyyy.MM.dd");

    const searchParams = new URLSearchParams({
      amount: form.getValues("amount").toString(),
      date: `${startDate},${endDate}`,
      method: form.getValues("method"),
      symbol: form
        .getValues("product")
        .map((el) => el.symbol)
        .join(","),
      percent: "100",
    });

    router.push(`/calculator/result?${searchParams.toString()}`);
  };

  return (
    <div className="flex w-full h-24 fixed bottom-0 bg-card px-30 justify-between items-center border-t">
      <PreviewContent />
      <div className="flex gap-3">
        {step === 1 ? (
          <Button type="button" size="lg" onClick={() => setStep(2)}>
            다음으로
          </Button>
        ) : (
          <>
            <Button
              type="button"
              size="lg"
              variant="outline"
              onClick={() => setStep(1)}
            >
              이전으로
            </Button>
            <Button
              size="lg"
              disabled={product?.length === 0}
              onClick={handleNavigation}
            >
              다음으로
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
