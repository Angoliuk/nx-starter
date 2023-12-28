import { ArgumentsHost, Catch, ExceptionFilter, Logger } from "@nestjs/common";
import { contract } from "@nx-starter/shared/api";
import { getErrorInfo } from "@nx-starter/shared/utils";
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
    } as ServerInferResponses<typeof contract.auth.signIn, 500>["body"] & { headers: OutgoingHttpHeaders };

    this.logger.error(exception, stack);
    res.status(statusCode).json(responseJson);
  }
}
