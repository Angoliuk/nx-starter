import { userIdSchema } from "@/shared/types";
import { z } from "zod";

export type TokenUser = z.infer<typeof tokenUser>;
export const tokenUser = z.object({
  userId: userIdSchema,
});
