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
import useCalculatorStore from "@/store/useCalculatorStore";
import CalculatorLayout from "@/components/calculator-layout";

// hooks
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { calculatorSchema } from "@/dto/calculator.dto";
import { z } from "zod";

import { methodMap } from "@/const/calculator";

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
  // const { method } = useCalculatorStore();

  const form = useForm<CalculatorSchema>({
    resolver: zodResolver(calculatorSchema),
  });

  function onSubmit(values: CalculatorSchema) {
    console.log(values);
  }

  const watchedValues = useWatch({
    control: form.control,
  });

  const labels: Record<keyof CalculatorSchema, string> = {
    method: "투자 유형",
  };
  const transforms = {
    method: (val: "1" | "2") => methodMap[val],
  };

  const previewItems = Object.entries(watchedValues).map(([key, value]) => ({
    label: labels[key as keyof CalculatorSchema],
    value: transforms[key as keyof CalculatorSchema](value),
  }));

  function Page1() {
    return (
      <CalculatorLayout step={1} title={titles[1]}>
        <div className="flex justify-center gap-6">
          <Card className="w-sm">
            <CardHeader>
              <CardTitle>투자 유형</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="method"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="max-w-sm"
                      >
                        {methods.map((method) => (
                          <Label
                            className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border border-neutral-700 p-4 has-[[data-state=checked]]:border-green-600 has-[[data-state=checked]]:bg-green-50 dark:has-[[data-state=checked]]:border-green-900 dark:has-[[data-state=checked]]:bg-green-950"
                            key={method.id}
                          >
                            <RadioGroupItem
                              value={method.id}
                              id={method.name}
                              className="shadow-none data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 *:data-[slot=radio-group-indicator]:[&>svg]:fill-white *:data-[slot=radio-group-indicator]:[&>svg]:stroke-white"
                            />
                            <div className="grid gap-1 font-normal">
                              <div className="font-medium">{method.name}</div>
                              <div className="text-muted-foreground leading-snug">
                                {method.description}
                              </div>
                            </div>
                          </Label>
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
            </CardContent>
          </Card>
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
        </div>
      </CalculatorLayout>
    );
  }

  function Page2() {
    return (
      <CalculatorLayout step={2} title={titles[2]}>
        <div className="flex justify-center">
          <Card className="w-3xl">stock</Card>
        </div>
      </CalculatorLayout>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {step === 1 ? <Page1 /> : <Page2 />}
        <div className="flex w-full h-20 fixed bottom-0 bg-card px-30 justify-between items-center">
          <div className="flex flex-col">
            {previewItems.map(({ label, value }) => (
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-sm font-semibold">
                  {label}
                </span>
                <span className="text-sm font-bold">{value}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            {step === 1 ? (
              <Button size="lg" onClick={() => setStep(2)}>
                다음으로
              </Button>
            ) : (
              <>
                <Button size="lg" variant="outline" onClick={() => setStep(1)}>
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
