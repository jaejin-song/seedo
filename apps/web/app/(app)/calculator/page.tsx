"use client";

import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { RadioGroup, RadioGroupItem } from "@repo/ui/components/radio-group";
import { Label } from "@repo/ui/components/label";
import { Separator } from "@repo/ui/components/separator";
import { Input } from "@repo/ui/components/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { useCalculatorStore } from "@/store/useCalculatorStore";
import CalculatorLayout from "@/components/calculator-layout";

// hooks
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { calculatorSchema } from "@/dto/calculator.dto";
import { z } from "zod";

import { methodMap } from "@/const/calculator";
import { MethodCard } from "@/components/calculator/method-card";
import { PeriodAmountCard } from "@/components/calculator/period-amount-card";
import { ProductCard } from "@/components/calculator/product-card";
import { add, format } from "date-fns";
import { kunit } from "@/lib/number";
import { PreviewContent } from "@/components/calculator/preview-content";

const titles = {
  1: "투자 금액, 기간과 투자 유형을 입력해주세요",
  2: "수익률을 계산할 상품을 선택해주세요",
};

const methods = [
  {
    id: "1",
    name: "거치식",
    description: "예금처럼 한번에 목돈을 투자하고 싶어요.",
  },
  {
    id: "2",
    name: "적립식",
    description: "적금처럼 매달 일정 금액을 투자하고 싶어요.",
  },
] as const;

type CalculatorSchema = z.infer<typeof calculatorSchema>;

export default function Page() {
  const [step, setStep] = useState<1 | 2>(1);

  const form = useForm<CalculatorSchema>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      method: "1",
      startDate: add(new Date(), { months: -3 }),
      endDate: new Date(),
      amount: kunit(1000, "만"),
    },
  });
  const setForm = useCalculatorStore((state) => state.setForm);

  useEffect(() => {
    setForm(form);
  }, [form, setForm]);

  function onSubmit(values: CalculatorSchema) {
    console.log(values);
  }

  // const watchedValues = useWatch({
  //   control: form.control,
  // });

  const labels: Record<keyof CalculatorSchema, string> = {
    method: "투자 유형",
    startDate: "start",
    endDate: "end",
    amount: "amount",
  };
  const transforms: Record<keyof CalculatorSchema, Function> = {
    method: (val: "1" | "2") => methodMap[val],
    startDate: (val: Date) => format(val, "yyyy.MM.dd"),
    endDate: (val: Date) => format(val, "yyyy.MM.dd"),
    // amount: (val: number) => val,
    amount: (val: string) => val,
  };

  // const previewItems = Object.entries(watchedValues).map(([key, value]) => ({
  //   label: labels[key as keyof CalculatorSchema],
  //   value: transforms[key as keyof CalculatorSchema](value),
  // }));

  function Page1() {
    return (
      <CalculatorLayout step={1} title={titles[1]}>
        <div className="flex justify-center gap-6">
          <MethodCard />
          <PeriodAmountCard />
        </div>
      </CalculatorLayout>
    );
  }

  function Page2() {
    return (
      <CalculatorLayout step={2} title={titles[2]}>
        <div className="flex justify-center">
          <ProductCard />
        </div>
      </CalculatorLayout>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {step === 1 ? <Page1 /> : <Page2 />}
        <div className="flex w-full h-24 fixed bottom-0 bg-card px-30 justify-between items-center">
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
                <Button size="lg">다음으로</Button>
              </>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
}
