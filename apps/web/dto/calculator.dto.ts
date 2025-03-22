import { z } from "zod";

export const calculatorSchema = z.object({
  method: z.enum(["1", "2"]),
});
