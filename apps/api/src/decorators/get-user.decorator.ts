import { ForbiddenError } from "@/shared/utils";
import { type ExecutionContext, createParamDecorator } from "@nestjs/common";
import { Request } from "express";

import { TokenUser, tokenUser } from "../validation";

export const GetUser = createParamDecorator((_, context: ExecutionContext): TokenUser => {
  const request = context.switchToHttp().getRequest<Request>();

  const { data, success } = tokenUser.safeParse(request?.user);
  if (!success) throw new ForbiddenError();

  return {
    userId: data.userId,
  };
});
