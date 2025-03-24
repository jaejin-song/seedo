import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Separator } from "@repo/ui/components/separator";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@repo/ui/components/form";

import { useCalculatorStore } from "@/store/useCalculatorStore";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/popover";
import { Button } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";
import { Duration, format, isSameDay, sub } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@repo/ui/components/calendar";
import { AmountInput } from "@/components/calculator/amount-input";
import { useCallback, useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import { kunit } from "@/lib/number";

const presetKeys = ["1m", "3m", "6m", "1y", "3y"] as const;
type PresetKey = (typeof presetKeys)[number];

const datePresets: Record<PresetKey, Duration> = {
  "1m": {
    months: 1,
  },
  "3m": {
    months: 3,
  },
  "6m": {
    months: 6,
  },
  "1y": {
    years: 1,
  },
  "3y": {
    years: 3,
  },
} as const;
const datePresetLabels: Record<PresetKey, string> = {
  "1m": "1개월 전",
  "3m": "3개월 전",
  "6m": "6개월 전",
  "1y": "1년 전",
  "3y": "3년 전",
};

const amountPresetKeys = [50, 100, 500, 1000, 5000] as const;

const amountPresets: { value: number; label: string }[] = amountPresetKeys.map(
  (preset) => ({
    value: kunit(preset, "만"),
    label: `+${preset}만원`,
  })
);

export function PeriodAmountCard() {
  const [currentPreset, setCurrentPreset] = useState<PresetKey | null>(null);

  const form = useCalculatorStore((state) => state.form);
  const startDate = useWatch({ control: form?.control, name: "startDate" });
  const endDate = useWatch({ control: form?.control, name: "endDate" });

  const setPresetDate = (presetKey: PresetKey) => {
    const newDate = sub(new Date(), datePresets[presetKey]);
    form?.setValue("startDate", newDate);
    form?.setValue("endDate", new Date());
  };

  const setPresetAmount = (presetAmount: number) => {
    const currentAmount = form?.getValues("amount") ?? 0;
    const newAmount = currentAmount + presetAmount;
    form?.setValue("amount", newAmount);
  };

  useEffect(() => {
    if (!isSameDay(new Date(), endDate)) return;

    let currentPreset: PresetKey | null = null;
    for (const key of presetKeys) {
      const newDate = sub(new Date(), datePresets[key]);

      if (isSameDay(newDate, startDate)) {
        currentPreset = key;
      }
    }
    setCurrentPreset(currentPreset);
  }, [startDate, endDate]);

  return (
    <Card className="w-md">
      <CardHeader>
        <CardTitle>투자 기간</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex gap-4">
          <FormField
            control={form?.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>시작일</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "yyyy.MM.dd")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          <FormField
            control={form?.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>종료일</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "yyyy.MM.dd")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-2">
          {presetKeys.map((preset) => (
            <Button
              className={cn(
                "flex-1",
                currentPreset === preset &&
                  "dark:border-green-900 dark:bg-green-950 dark:hover:bg-green-950"
              )}
              key={preset}
              variant="outline"
              size="sm"
              type="button"
              onClick={() => setPresetDate(preset)}
            >
              {datePresetLabels[preset]}
            </Button>
          ))}
        </div>
        <ul className="list-disc marker:text-card-foreground px-5">
          <li className="text-sm/6">오늘 이전 날짜만 선택 가능합니다.</li>
          <li className="text-sm/6">
            기간 선택 버튼을 선택하시면 간편하게 기간을 설정 할 수 있습니다.
          </li>
        </ul>
      </CardContent>

      <CardContent className="my-3">
        <Separator />
      </CardContent>

      <CardHeader>
        <CardTitle>투자 금액</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <FormField
          control={form?.control}
          name="amount"
          render={({ field }) => (
            <FormControl>
              <AmountInput
                value={field.value}
                onChange={(val) => form?.setValue("amount", val)}
              />
            </FormControl>
          )}
        />
        <div className="flex gap-2">
          {amountPresets.map((preset) => (
            <Button
              className="flex-1 text-xs px-1"
              key={preset.value}
              variant="outline"
              size="sm"
              type="button"
              onClick={() => setPresetAmount(preset.value)}
            >
              {preset.label}
            </Button>
          ))}
        </div>
        <ul className="list-disc marker:text-card-foreground px-5">
          <li className="text-sm/6">
            직접 숫자를 입력하시거나, 하단의 투자금액을 선택하시기 바랍니다.
          </li>
          <li className="text-sm/6">
            직접 입력하시는 경우 10만원~100억원 미만 사이의 숫자를 입력해주시기
            바랍니다.
          </li>
          <li className="text-sm/6">
            거치식의 경우에는 총 투자금액을, 적립식의 경우에는 월 투자금액을
            의미합니다.
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
