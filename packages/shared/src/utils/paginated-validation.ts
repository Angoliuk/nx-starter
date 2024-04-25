import { ZodTypeAny, z } from "zod";

export const getPaginatedValidation = <T extends ZodTypeAny>(itemSchema: T) => {
  return z.object({
    items: z.array(itemSchema),
    pagination: z.object({
      count: z.number().min(0),
      limit: z.number().min(0),
      page: z.number().min(0),
    }),
  });
};
