import { AnyZodObject, z as zod } from "zod";

import { StatusCodes } from "../constants";
import { emptySchema, signInBodySchema, signUpBodySchema, tokensSchema } from "../validation";
import { ContractInstance } from "./types";

const successSchema = (dataSchema?: AnyZodObject) =>
  zod.object({
    data: dataSchema ?? zod.undefined(),
    message: zod.string(),
    status: zod.number(),
  });

const errorSchema = (errorSchema?: AnyZodObject) =>
  zod.object({
    error: errorSchema ?? zod.string(),
    message: zod.string(),
    status: zod.number(),
  });

export const authContract = (c: ContractInstance) =>
  c.router(
    {
      logout: {
        body: emptySchema,
        method: "POST",
        path: "/logout",
        responses: {
          [StatusCodes.FORBIDDEN]: errorSchema(),
          [StatusCodes.SERVER_ERROR]: errorSchema(),
          [StatusCodes.SUCCESS]: successSchema(),
        },
      },
      refreshTokens: {
        body: tokensSchema,
        method: "POST",
        path: "/refresh",
        responses: {
          [StatusCodes.FORBIDDEN]: errorSchema(),
          [StatusCodes.SERVER_ERROR]: errorSchema(),
          [StatusCodes.SUCCESS]: successSchema(),
        },
      },
      signIn: {
        body: signInBodySchema,
        method: "POST",
        path: "/sign-in",
        responses: {
          [StatusCodes.FORBIDDEN]: errorSchema(),
          [StatusCodes.SERVER_ERROR]: errorSchema(),
          [StatusCodes.SUCCESS]: successSchema(),
        },
        summary: "test",
      },
      signUp: {
        body: signUpBodySchema,
        method: "POST",
        path: "/sign-up",
        responses: {
          [StatusCodes.FORBIDDEN]: errorSchema(),
          [StatusCodes.SERVER_ERROR]: errorSchema(),
          [StatusCodes.SUCCESS]: successSchema(),
        },
        summary: "test",
      },
    },
    { pathPrefix: "/auth" },
  );
