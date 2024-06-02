import { z } from "zod";

export type UserIdSchema = z.infer<typeof userIdSchema>;
export const userIdSchema = z.string().uuid();

export type TokensSchema = z.infer<typeof tokensSchema>;
export const tokensSchema = z.object({
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1),
});
export const userPasswordSchema = z.string().min(6);

export type UserSchema = z.infer<typeof userSchema>;
export const userSchema = z.object({
  createdAt: z.coerce.date(),
  email: z.string().email(),
  id: userIdSchema,
  password: userPasswordSchema,
  updatedAt: z.coerce.date(),
});
