"use client";

import { Button } from "@repo/ui/components/button";
import { Form } from "@repo/ui/components/form";
import { useCalculatorStore } from "@/store/useCalculatorStore";
import CalculatorLayout from "@/components/calculator-layout";

// hooks
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { calculatorSchema } from "@/dto/calculator.dto";
import { z } from "zod";

import { MethodCard } from "@/components/calculator/method-card";
import { PeriodAmountCard } from "@/components/calculator/period-amount-card";
import { ProductCard } from "@/components/calculator/product-card";
import { add } from "date-fns";
import { kunit } from "@/lib/number";
import { PreviewContent } from "@/components/calculator/preview-content";
import { PreviewSheet } from "@/components/calculator/preview-sheet";
import { shallow, useShallow } from "zustand/shallow";

const titles = {
  1: "투자 금액, 기간과 투자 유형을 입력해주세요",
  2: "수익률을 계산할 상품을 선택해주세요",
};

type CalculatorSchema = z.infer<typeof calculatorSchema>;

export default function Page() {
  const form = useForm<CalculatorSchema>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      method: "1",
      startDate: add(new Date(), { months: -3 }),
      endDate: new Date(),
      amount: kunit(1000, "만"),
      product: [],
    },
  });
  const { step, setStep, setForm } = useCalculatorStore(
    useShallow((state) => ({
      step: state.step,
      setStep: state.setStep,
      setForm: state.setForm,
    }))
  );

  useEffect(() => {
    setForm(form);
  }, [form, setForm]);

  useEffect(() => {
    console.log("form reset");
    form.reset();
  }, []);

  function onSubmit(values: CalculatorSchema) {
    console.log(values);
  }

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
        <PreviewSheet />
      </form>
    </Form>
  );
}
