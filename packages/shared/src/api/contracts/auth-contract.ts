import { ForbiddenError, NotFoundError, ServerError } from "../../utils/errors";
import {
  signInBodySchema,
  signInResponseSchema,
  signUpBodySchema,
  signUpResponseSchema,
  tokensSchema,
} from "../../validation";
import { STATUS_CODES } from "../constants";
import { ContractInstance } from "./types";

export const authContract = (c: ContractInstance) =>
  c.router(
    {
      logout: {
        body: null,
        method: "POST",
        path: "/logout",
        responses: {
          [STATUS_CODES.FORBIDDEN]: ForbiddenError.zodSchema,
          [STATUS_CODES.SERVER_ERROR]: ServerError.zodSchema,
          [STATUS_CODES.SUCCESS]: null,
        },
      },
      refreshTokens: {
        body: null,
        method: "POST",
        path: "/refresh",
        responses: {
          [STATUS_CODES.FORBIDDEN]: ForbiddenError.zodSchema,
          [STATUS_CODES.NOT_FOUND]: NotFoundError.zodSchema,
          [STATUS_CODES.SERVER_ERROR]: ServerError.zodSchema,
          [STATUS_CODES.SUCCESS]: tokensSchema,
        },
      },
      signIn: {
        body: signInBodySchema,
        method: "POST",
        path: "/sign-in",
        responses: {
          [STATUS_CODES.FORBIDDEN]: ForbiddenError.zodSchema,
          [STATUS_CODES.NOT_FOUND]: NotFoundError.zodSchema,
          [STATUS_CODES.SERVER_ERROR]: ServerError.zodSchema,
          [STATUS_CODES.SUCCESS]: signInResponseSchema,
        },
      },
      signUp: {
        body: signUpBodySchema,
        method: "POST",
        path: "/sign-up",
        responses: {
          [STATUS_CODES.FORBIDDEN]: ForbiddenError.zodSchema,
          [STATUS_CODES.NOT_FOUND]: NotFoundError.zodSchema,
          [STATUS_CODES.SERVER_ERROR]: ServerError.zodSchema,
          [STATUS_CODES.SUCCESS]: signUpResponseSchema,
        },
      },
    },
    { pathPrefix: "/auth" },
  );
