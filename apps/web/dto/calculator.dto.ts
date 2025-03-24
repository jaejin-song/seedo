import { z } from "zod";

const AMOUNT_MIN = 10_0000; // 10만원
const AMOUNT_MAX = 100_0000_0000; // 100억

export const calculatorSchema = z.object({
  method: z.enum(["1", "2"]),
  startDate: z.date(),
  endDate: z.date(),
  amount: z.number().min(AMOUNT_MIN).max(AMOUNT_MAX),
});
