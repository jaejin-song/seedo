"use client";

import { useState, useEffect } from "react";
import { formatKoreanCurrency } from "@/lib/format";
import { NumericFormat } from "react-number-format";
import { cn } from "@repo/ui/lib/utils";

interface AmountInputProps
  extends Omit<React.ComponentProps<"input">, "value" | "onChange"> {
  value: number;
  onChange: (val: number) => void;
}

export function AmountInput({ value, onChange }: AmountInputProps) {
  const [koreanValue, setKoreanValue] = useState<string>(
    formatKoreanCurrency(value)
  );

  useEffect(() => {
    if (value) {
      setKoreanValue(formatKoreanCurrency(value));
    } else {
      setKoreanValue("");
    }
  }, [value]);

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div className="relative">
        <div className="relative">
          <NumericFormat
            className={cn(
              "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
              "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
              "pr-8 text-right"
            )}
            value={value}
            onValueChange={(values) => {
              onChange(values.floatValue!);
            }}
            thousandSeparator
            allowNegative={false}
            inputMode="numeric"
          />

          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            원
          </div>

          {koreanValue && value && (
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-500">
              {koreanValue}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
