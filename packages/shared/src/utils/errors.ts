import { z } from "zod";

import { STATUS_CODES, StatusCodes } from "../constants";

export abstract class BaseError extends Error {
  static statusCode: StatusCodes;

  static zodSchema = z.object({
    message: z.string(),
  });

  static extend<TName extends string, TStatus extends StatusCodes>(
    name: TName,
    statusCode: TStatus,
  ): ErrorConstructor<TName, TStatus> {
    return class ErrorImpl extends this {
      static override statusCode = statusCode;
      static override zodSchema = super.zodSchema.extend({
        name: z.literal(name),
      });

      override name = name;
      override statusCode = statusCode;

      static override extend<T extends string>(name: T) {
        return super.extend(name, statusCode);
      }
    };
  }
  abstract override name: string;

  abstract statusCode: StatusCodes;
}

type Merge<T, K> = K & Omit<T, keyof K>;

type ErrorConstructor<TName extends string, TStatus extends StatusCodes> = Merge<
  typeof Error,
  {
    extend<T extends string>(name: T): ErrorConstructor<T, TStatus>;
    new (...args: ConstructorParameters<typeof BaseError>): BaseErrorType<TName, TStatus>;
    statusCode: TStatus;
    zodSchema: ReturnType<typeof BaseError.zodSchema.extend<{ name: z.ZodLiteral<TName> }>>;
  }
>;

type BaseErrorType<TName extends string, TStatus extends StatusCodes> = Merge<
  Error,
  {
    name: TName;
    statusCode: TStatus;
  }
>;

export class ForbiddenError extends BaseError.extend("ForbiddenError", STATUS_CODES.FORBIDDEN) {}

export class JWTError extends BaseError.extend("JWTError", STATUS_CODES.FORBIDDEN) {}

export class NotFoundError extends BaseError.extend("NotFoundError", STATUS_CODES.NOT_FOUND) {}

export class BadRequestError extends BaseError.extend(
  "BadRequestError",
  STATUS_CODES.BAD_REQUEST,
) {}

export class RequestValidationError extends BaseError.extend(
  "RequestValidationError",
  STATUS_CODES.BAD_REQUEST,
) {}

export class ResponseValidationError extends BaseError.extend(
  "ResponseValidationError",
  STATUS_CODES.BAD_REQUEST,
) {}

export class ServerError extends BaseError.extend(
  "InternalServerError",
  STATUS_CODES.SERVER_ERROR,
) {}

export class TimeoutError extends BaseError.extend("TimeoutError", STATUS_CODES.TIMEOUT_ERROR) {}
