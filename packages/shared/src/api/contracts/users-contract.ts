import { ForbiddenError, NotFoundError, ServerError } from "../../utils/errors";
import {
  createUserBodySchema,
  createUserResponseSchema,
  deleteUserPathParamsSchema,
  deleteUserResponseSchema,
  getByIdUserPathParamsSchema,
  getByIdUserResponseSchema,
  getUsersQuerySchema,
  getUsersResponseSchema,
  updateUserBodySchema,
  updateUserPathParamsSchema,
  updateUserResponseSchema,
} from "../../validation/users/index";
import { STATUS_CODES } from "../constants";
import { ContractInstance } from "./types";

export const usersContract = (c: ContractInstance) =>
  c.router(
    {
      create: {
        body: createUserBodySchema,
        method: "POST",
        path: "/",
        responses: {
          [STATUS_CODES.FORBIDDEN]: ForbiddenError.zodSchema,
          [STATUS_CODES.NOT_FOUND]: NotFoundError.zodSchema,
          [STATUS_CODES.SERVER_ERROR]: ServerError.zodSchema,
          [STATUS_CODES.SUCCESS]: createUserResponseSchema,
        },
      },
      delete: {
        body: null,
        method: "DELETE",
        path: "/:userId",
        pathParams: deleteUserPathParamsSchema,
        responses: {
          [STATUS_CODES.FORBIDDEN]: ForbiddenError.zodSchema,
          [STATUS_CODES.NOT_FOUND]: NotFoundError.zodSchema,
          [STATUS_CODES.SERVER_ERROR]: ServerError.zodSchema,
          [STATUS_CODES.SUCCESS]: deleteUserResponseSchema,
        },
      },
      get: {
        method: "GET",
        path: "/",
        query: getUsersQuerySchema,
        responses: {
          [STATUS_CODES.FORBIDDEN]: ForbiddenError.zodSchema,
          [STATUS_CODES.NOT_FOUND]: NotFoundError.zodSchema,
          [STATUS_CODES.SERVER_ERROR]: ServerError.zodSchema,
          [STATUS_CODES.SUCCESS]: getUsersResponseSchema,
        },
      },
      getById: {
        method: "GET",
        path: "/:userId",
        pathParams: getByIdUserPathParamsSchema,
        responses: {
          [STATUS_CODES.FORBIDDEN]: ForbiddenError.zodSchema,
          [STATUS_CODES.NOT_FOUND]: NotFoundError.zodSchema,
          [STATUS_CODES.SERVER_ERROR]: ServerError.zodSchema,
          [STATUS_CODES.SUCCESS]: getByIdUserResponseSchema,
        },
      },
      update: {
        body: updateUserBodySchema,
        method: "PUT",
        path: "/:userId",
        pathParams: updateUserPathParamsSchema,
        responses: {
          [STATUS_CODES.FORBIDDEN]: ForbiddenError.zodSchema,
          [STATUS_CODES.NOT_FOUND]: NotFoundError.zodSchema,
          [STATUS_CODES.SERVER_ERROR]: ServerError.zodSchema,
          [STATUS_CODES.SUCCESS]: updateUserResponseSchema,
        },
      },
    },
    { pathPrefix: "/users" },
  );
