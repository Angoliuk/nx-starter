import { tokensSchema, userIdSchema, userSchema } from "@/shared/types";
import { z } from "zod";

export type SignInBodySchema = z.infer<typeof signInBodySchema>;
export const signInBodySchema = z.object({ email: z.string().min(1), password: z.string().min(1) });

export type SignInResponseSchema = z.infer<typeof signInResponseSchema>;
export const signInResponseSchema = z.object({ id: userIdSchema }).and(tokensSchema);

export type SignUpBodySchema = z.infer<typeof signUpBodySchema>;
export const signUpBodySchema = z.object({ email: z.string().min(1), password: z.string().min(1) });

export type SignUpResponseSchema = z.infer<typeof signUpResponseSchema>;
export const signUpResponseSchema = z.object({ id: userIdSchema }).and(tokensSchema);

export type MeResponseSchema = z.infer<typeof meResponseSchema>;
export const meResponseSchema = userSchema;
