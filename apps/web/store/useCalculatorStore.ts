import { calculatorSchema } from "@/dto/calculator.dto";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { create } from "zustand";

type CalculatorSchema = z.infer<typeof calculatorSchema>;

interface CalculatorStore {
  form: UseFormReturn<CalculatorSchema> | null;
  setForm: (form: UseFormReturn<CalculatorSchema>) => void;
}

export const useCalculatorStore = create<CalculatorStore>((set) => ({
  form: null,
  setForm: (form) => set({ form }),
}));
