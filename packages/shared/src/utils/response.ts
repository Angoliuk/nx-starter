import { STATUS_CODES } from "../constants";
import { BaseError } from "./errors";

export type FormatSuccessResponse<T> = { body: T; status: typeof STATUS_CODES.SUCCESS };
export type FormatErrorResponse<T extends BaseError> = { body: T; status: T["statusCode"] };
export type FormatResponse<T> = T extends BaseError
  ? FormatErrorResponse<T>
  : FormatSuccessResponse<T>;

// TODO: Fix @ts-expect-error wrong type
export const formatResponse = <T>(response: T): FormatResponse<T> => {
  // @ts-expect-error wrong type
  if (response instanceof BaseError) return { body: response, status: response.statusCode };
  // @ts-expect-error wrong type
  return { body: response, status: STATUS_CODES.SUCCESS };
};
