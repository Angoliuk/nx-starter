import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger("HTTP");

  use(request: Request, response: Response, next: NextFunction): void {
    const { baseUrl, method } = request;

    response.on("error", error => {
      this.logger.fatal(error);
    });

    response.on("close", () => {
      this.logger.log(`${method} ${baseUrl} ${response.statusCode}`);
    });

    next();
  }
}
