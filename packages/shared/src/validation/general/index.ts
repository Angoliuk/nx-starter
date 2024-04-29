import { z } from "zod";

export type UserIdSchema = z.infer<typeof userIdSchema>;
export const userIdSchema = z.string().min(1);

export type TokensSchema = z.infer<typeof tokensSchema>;
export const tokensSchema = z.object({ accessToken: z.string().min(1), refreshToken: z.string().min(1) });
