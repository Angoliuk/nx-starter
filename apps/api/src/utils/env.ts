import { z } from "zod";

export type EnvSchema = z.infer<typeof envSchema>;
export const envSchema = z.object({
  ACCESS_SECRET_TOKEN: z.string().min(1),
  ACCESS_SECRET_TOKEN_EXPIRES_IN: z.number().min(1),
  PORT: z.number(),
  REFRESH_SECRET_TOKEN: z.string().min(1),
  REFRESH_SECRET_TOKEN_EXPIRES_IN: z.number().min(1),
});
