import { z as zod } from "zod";

export type SignInBodySchema = zod.infer<typeof signInBodySchema>;
export const signInBodySchema = zod.object({ email: zod.string().min(1), password: zod.string().min(1) });

export type SignUpBodySchema = zod.infer<typeof signUpBodySchema>;
export const signUpBodySchema = zod.object({ email: zod.string().min(1), password: zod.string().min(1) });
