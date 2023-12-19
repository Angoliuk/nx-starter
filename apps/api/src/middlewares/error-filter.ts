import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Response } from "express";

const getErrorCode = (error: unknown, defaultErrorCode: number) => {
  if (typeof error !== "object" || Array.isArray(error) || error === null) return defaultErrorCode;

  let status;

  if ("getStatus" in error && error.getStatus instanceof Function) {
    status = Number(error.getStatus());
  } else if ("code" in error) {
    status = Number(error.code);
  } else if ("statusCode" in error) {
    status = Number(error.statusCode);
  }

  return status ? status : defaultErrorCode;
};

const getErrorMessage = (error: unknown, status: number) => {
  return typeof error === "object" &&
    !Array.isArray(error) &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
    ? error.message
    : "Server error with status " + status;
};

@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();

    const status = getErrorCode(exception, 500);

    res.status(status).json({
      error: exception,
      message: getErrorMessage(exception, status),
      status,
    });
  }
}
