import { ArgumentsHost, Catch, ExceptionFilter, Logger } from "@nestjs/common";
import { StatusCodes, contract } from "@nx-starter/shared/api";
import { ServerInferResponses } from "@ts-rest/core";
import { Response } from "express";
import { OutgoingHttpHeaders } from "node:http";

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
  private logger = new Logger("HTTP");

  catch(exception: unknown, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();
    const status = getErrorCode(exception, StatusCodes.SERVER_ERROR);

    const responseJson = {
      message: getErrorMessage(exception, status),
      name: "Unknown error",
    } as ServerInferResponses<typeof contract.auth.signIn, 500>["body"] & { headers: OutgoingHttpHeaders };

    this.logger.error(exception);
    res.status(status).json(responseJson);
  }
}
