import { z } from "zod";

export type UserId = z.infer<typeof userId>;
export const userId = z.object({ userId: z.string().min(1) });

export type TokensSchema = z.infer<typeof tokensSchema>;
export const tokensSchema = z.object({ accessToken: z.string().min(1), refreshToken: z.string().min(1) });

export const baseHeaders = z.object({
  authorization: z.string(),
});
