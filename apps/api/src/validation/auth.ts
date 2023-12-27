import { z } from "zod";

export type TokenUser = z.infer<typeof tokenUser>;
export const tokenUser = z.object({
  email: z.string().min(1),
  userId: z.string().min(1),
});
