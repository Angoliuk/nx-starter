import { z } from "zod";

export type SignInBodySchema = z.infer<typeof signInBodySchema>;
export const signInBodySchema = z.object({ email: z.string().min(1), password: z.string().min(1) });

export type SignUpBodySchema = z.infer<typeof signUpBodySchema>;
export const signUpBodySchema = z.object({ email: z.string().min(1), password: z.string().min(1) });
