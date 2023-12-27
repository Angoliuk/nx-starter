import { z } from "zod";

import { ForbiddenError, NotFoundError, ServerError } from "../../utils/errors";
import {
  baseHeaders,
  emptySchema,
  signInBodySchema,
  signInResponseSchema,
  signUpBodySchema,
  signUpResponseSchema,
  tokensSchema,
} from "../../validation";
import { StatusCodes } from "../constants";
import { ContractInstance } from "./types";

export const authContract = (c: ContractInstance) =>
  c.router(
    {
      logout: {
        body: emptySchema,
        headers: baseHeaders,
        method: "POST",
        path: "/logout",
        responses: {
          [StatusCodes.FORBIDDEN]: ForbiddenError.zodSchema,
          [StatusCodes.SERVER_ERROR]: ServerError.zodSchema,
          [StatusCodes.SUCCESS]: z.object({}),
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
          [StatusCodes.SUCCESS]: tokensSchema,
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
          [StatusCodes.SUCCESS]: signInResponseSchema,
        },
      },
      signUp: {
        body: signUpBodySchema,
        method: "POST",
        path: "/sign-up",
        responses: {
          [StatusCodes.FORBIDDEN]: ForbiddenError.zodSchema,
          [StatusCodes.NOT_FOUND]: NotFoundError.zodSchema,
          [StatusCodes.SERVER_ERROR]: ServerError.zodSchema,
          [StatusCodes.SUCCESS]: signUpResponseSchema,
        },
      },
    },
    { pathPrefix: "/auth" },
  );
