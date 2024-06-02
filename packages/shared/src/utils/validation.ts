import { AnyZodObject, EnumLike, RawCreateParams, ZodTypeAny, z } from "zod";

export type SortOrderSchema = z.infer<typeof sortOrderSchema>;
export const sortOrderSchema = z.enum(["asc", "desc"]);

export type PaginationResponseSchema = z.infer<typeof paginationResponseSchema>;
export const paginationResponseSchema = z.object({
  count: z.coerce.number().min(0),
  limit: z.coerce.number().min(0),
  page: z.coerce.number().min(0),
  totalPages: z.coerce.number().min(0),
});

export const getPaginatedResponseValidation = <T extends ZodTypeAny>(itemSchema: T) => {
  return z.object({
    items: z.array(itemSchema),
    pagination: paginationResponseSchema,
  });
};

export const getBaseQuerySchema = <T extends AnyZodObject, C extends [keyof T["shape"]]>(
  entitySchema: T,
) => {
  return z
    .object({
      orderBy: z
        // TODO: Fix @ts-expect-error wrong type
        // @ts-expect-error enum do not want to accept C as generic
        .record(z.enum<string, C>(Object.keys(entitySchema.shape) as C), sortOrderSchema)
        .optional(),
    })
    .and(paginationQuerySchema);
};

export const paginationQuerySchema = z.object({
  limit: z.coerce.number().min(0).default(10),
  page: z.coerce.number().min(0),
});

export const uniqueEnumArray = <T extends EnumLike>(enumValues: T) => {
  return z.array(z.nativeEnum(enumValues)).refine(
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
