import { getErrorInfo } from "@/shared/utils";
import { webContract } from "@/web-shared/api";
import { ArgumentsHost, Catch, ExceptionFilter, Logger } from "@nestjs/common";
import { ServerInferResponses } from "@ts-rest/core";
import { Response } from "express";
import { OutgoingHttpHeaders } from "node:http";

@Catch()
export class ErrorFilter implements ExceptionFilter {
  private logger = new Logger("HTTP");

  catch(exception: unknown, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();

    const { message, name, stack, statusCode } = getErrorInfo(exception);

    const responseJson = {
      message,
      name,
    } as {
      headers: OutgoingHttpHeaders;
    } & ServerInferResponses<typeof webContract.auth.signIn, 500>["body"];

    if (name === "JWTError" || name === "UnauthorizedException") {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
    }

    this.logger.error(exception, stack);
    res.status(statusCode).json(responseJson);
  }
}
