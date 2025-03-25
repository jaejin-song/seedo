import { calculatorSchema } from "@/dto/calculator.dto";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { create } from "zustand";

type CalculatorSchema = z.infer<typeof calculatorSchema>;

interface CalculatorStore {
  form: UseFormReturn<CalculatorSchema> | null;
  setForm: (form: UseFormReturn<CalculatorSchema>) => void;
  step: number;
  setStep: (step: number) => void;
}

export const useCalculatorStore = create<CalculatorStore>((set) => ({
  form: null,
  setForm: (form) => set({ form }),
  step: 1,
  setStep: (step) => set({ step }),
}));
