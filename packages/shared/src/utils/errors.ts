import { z as zod } from "zod";

import { StatusCodes } from "../api/constants";
import { ObjectValues } from "../types";

export class BaseError extends Error {
  static zodSchema = zod.object({
    message: zod.string(),
    name: zod.string(),
  });

  httpStatus: ObjectValues<typeof StatusCodes> = StatusCodes.SERVER_ERROR;

  constructor(message?: string) {
    super(message ?? "Unknown error, status 500");
  }

  toJSON() {
    return {
      message: this.message,
      name: this.name,
    };
  }
}

export class ForbiddenError extends BaseError {
  override httpStatus = StatusCodes.FORBIDDEN;

  constructor(message?: string) {
    super(message ?? `Forbidden error, status ${StatusCodes.FORBIDDEN}`);
  }
}

export class NotFoundError extends BaseError {
  override httpStatus = StatusCodes.NOT_FOUND;

  constructor(message?: string) {
    super(message ?? `Not found error, status ${StatusCodes.NOT_FOUND}`);
  }
}

export class ServerError extends BaseError {
  override httpStatus = StatusCodes.SERVER_ERROR;

  constructor(message?: string) {
    super(message ?? `Server error, status ${StatusCodes.SERVER_ERROR}`);
  }
}

export class TimeoutError extends BaseError {
  override httpStatus = StatusCodes.TIMEOUT_ERROR;

  constructor(message?: string) {
    super(message ?? `Request timeout, status ${StatusCodes.TIMEOUT_ERROR}`);
  }
}
