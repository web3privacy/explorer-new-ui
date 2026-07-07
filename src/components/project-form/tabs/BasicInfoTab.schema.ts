import { z } from "zod";

export const basicInfoSchema = z.object({
  categories: z.array(z.string()).min(1, "Select at least one category"),
  usecases: z.array(z.string()).min(1, "Select at least one use-case"),
  ecosystem: z.array(z.string()).min(1, "Select at least one ecosystem"),
  description: z.string().min(1, "Description is required"),
  product_launch_day: z.string().optional(),
  nickname: z.string().optional(),
  sunset: z.boolean(),
});

export type BasicInfoValues = z.infer<typeof basicInfoSchema>;
