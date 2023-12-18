import { z as zod } from "zod";

export const emptySchema = zod.object({}).nullish();

export type UserId = zod.infer<typeof userId>;
export const userId = zod.object({ userId: zod.string().min(1) });

export type TokensSchema = zod.infer<typeof tokensSchema>;
export const tokensSchema = zod.object({ accessToken: zod.string().min(1), refreshToken: zod.string().min(1) });
