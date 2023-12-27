import { z } from "zod";

import { tokensSchema } from "../general";

export type SignInBodySchema = z.infer<typeof signInBodySchema>;
export const signInBodySchema = z.object({ email: z.string().min(1), password: z.string().min(1) });

export type SignInResponseSchema = z.infer<typeof signInResponseSchema>;
export const signInResponseSchema = z.object({ email: z.string().min(1), id: z.string().min(1) }).and(tokensSchema);

export type SignUpBodySchema = z.infer<typeof signUpBodySchema>;
export const signUpBodySchema = z.object({ email: z.string().min(1), password: z.string().min(1) });

export type SignUpResponseSchema = z.infer<typeof signUpResponseSchema>;
export const signUpResponseSchema = z.object({ email: z.string().min(1), id: z.string().min(1) }).and(tokensSchema);
