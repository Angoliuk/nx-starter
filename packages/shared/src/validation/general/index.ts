import { AnyZodObject, RawCreateParams, ZodTypeAny, z } from "zod";

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

export const getBaseQuerySchema = <T extends AnyZodObject, C extends [keyof T["shape"]]>(entitySchema: T) => {
  return z
    .object({
      // @ts-expect-error enum do not want to accept C as generic
      orderBy: z.record(z.enum<string, C>(Object.keys(entitySchema.shape) as C), sortOrderSchema).optional(),
    })
    .and(paginationQuerySchema);
};

export const paginationQuerySchema = z.object({
  limit: z.coerce.number().min(0).default(10),
  page: z.coerce.number().min(0),
});

export const uniqueEnumArray = <U extends string, T extends Readonly<[U, ...U[]]>>(enumValues: T) => {
  return z.array(z.enum(enumValues)).refine(
    arr => {
      const uniqueSet = new Set(arr);
      return uniqueSet.size === arr.length;
    },
    {
      message: "Array must contain unique values",
    },
  );
};

export const uniqueArray = <T extends ZodTypeAny>(schema: T, params?: RawCreateParams) => {
  return z.array(schema, params).refine(
    arr => {
      const uniqueSet = new Set(arr);
      return uniqueSet.size === arr.length;
    },
    {
      message: "Array must contain unique values",
    },
  );
};
