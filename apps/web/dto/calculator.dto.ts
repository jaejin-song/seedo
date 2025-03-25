import { kunit } from "@/lib/number";
import { z } from "zod";

const AMOUNT_MIN = kunit(10, "만"); // 10만원
const AMOUNT_MAX = kunit(100, "억"); // 100억

export const calculatorSchema = z.object({
  method: z.enum(["1", "2"]),
  startDate: z.date(),
  endDate: z.date(),
  amount: z.number().min(AMOUNT_MIN).max(AMOUNT_MAX),
  product: z
    .array(
      z.object({
        symbol: z.string(),
        name: z.string(),
      })
    )
    .min(1),
});
