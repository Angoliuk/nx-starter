import { AnyZodObject, ZodTypeAny, z } from "zod";

export type UserIdSchema = z.infer<typeof userIdSchema>;
export const userIdSchema = z.string().min(1);

export type TokensSchema = z.infer<typeof tokensSchema>;
export const tokensSchema = z.object({ accessToken: z.string().min(1), refreshToken: z.string().min(1) });

export type SortOrderSchema = z.infer<typeof sortOrderSchema>;
export const sortOrderSchema = z.enum(["asc", "desc"]);

export type PaginationResponseSchema = z.infer<typeof paginationResponseSchema>;
export const paginationResponseSchema = z.object({
  limit: z.number().min(0),
  page: z.number().min(0),
});

export const getPaginatedResponseValidation = <T extends ZodTypeAny>(itemSchema: T) => {
  return z.object({
    items: z.array(itemSchema),
    pagination: paginationResponseSchema,
  });
};

export const getBaseQueryValidation = <T extends AnyZodObject, C extends [keyof T["shape"]]>(entitySchema: T) => {
  return z.object({
    limit: z.number().min(0),
    // @ts-expect-error enum do not want to accept C as generic
    orderBy: z.record(z.enum<string, C>(Object.keys(entitySchema.shape) as C), sortOrderSchema),
    page: z.number().min(0),
  });
};
