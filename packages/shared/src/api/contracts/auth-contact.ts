import { z as zod } from "zod";

import { ForbiddenError, NotFoundError, ServerError } from "../../utils/errors";
import { emptySchema, signInBodySchema, signUpBodySchema, tokensSchema } from "../../validation";
import { StatusCodes } from "../constants";
import { ContractInstance } from "./types";

export const authContract = (c: ContractInstance) =>
  c.router(
    {
      logout: {
        body: emptySchema,
        method: "POST",
        path: "/logout",
        responses: {
          [StatusCodes.FORBIDDEN]: ForbiddenError.zodSchema,
          [StatusCodes.SERVER_ERROR]: ServerError.zodSchema,
          [StatusCodes.SUCCESS]: zod.object({}),
        },
      },
      refreshTokens: {
        body: tokensSchema,
        method: "POST",
        path: "/refresh",
        responses: {
          [StatusCodes.FORBIDDEN]: ForbiddenError.zodSchema,
          [StatusCodes.NOT_FOUND]: NotFoundError.zodSchema,
          [StatusCodes.SERVER_ERROR]: ServerError.zodSchema,
          [StatusCodes.SUCCESS]: zod.object({}),
        },
      },
      signIn: {
        body: signInBodySchema,
        method: "POST",
        path: "/sign-in",
        responses: {
          [StatusCodes.FORBIDDEN]: ForbiddenError.zodSchema,
          [StatusCodes.NOT_FOUND]: NotFoundError.zodSchema,
          [StatusCodes.SERVER_ERROR]: ServerError.zodSchema,
          [StatusCodes.SUCCESS]: zod.object({}),
        },
        summary: "test",
      },
      signUp: {
        body: signUpBodySchema,
        method: "POST",
        path: "/sign-up",
        responses: {
          [StatusCodes.FORBIDDEN]: ForbiddenError.zodSchema,
          [StatusCodes.NOT_FOUND]: NotFoundError.zodSchema,
          [StatusCodes.SERVER_ERROR]: ServerError.zodSchema,
          [StatusCodes.SUCCESS]: zod.object({}),
        },
        summary: "test",
      },
    },
    { pathPrefix: "/auth" },
  );
