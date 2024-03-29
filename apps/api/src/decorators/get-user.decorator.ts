import { ForbiddenError } from "@/shared/utils";
import { type ExecutionContext, createParamDecorator } from "@nestjs/common";
import { Request } from "express";

import { TokenUser } from "../validation";

export const GetUser = createParamDecorator((_, context: ExecutionContext): TokenUser => {
  const request = context.switchToHttp().getRequest<Request>();

  if (!request?.user?.email || !request?.user?.userId) throw new ForbiddenError();

  return {
    email: request.user.email,
    userId: request.user.userId,
  };
});
