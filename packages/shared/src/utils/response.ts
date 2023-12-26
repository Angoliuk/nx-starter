import { StatusCodes } from "../api";
import { BaseError } from "./errors";

export type FormatSuccessResponse<T> = { body: T; status: typeof StatusCodes.SUCCESS };
export type FormatErrorResponse<T extends BaseError> = { body: ReturnType<T["toJSON"]>; status: T["httpStatus"] };
export type FormatResponse<T> = T extends BaseError ? FormatErrorResponse<T> : FormatSuccessResponse<T>;

export const formatResponse = <T>(response: T): FormatResponse<T> => {
  if (response instanceof BaseError) return { body: response.toJSON(), status: response.httpStatus };
  return { body: response, status: StatusCodes.SUCCESS };
};
