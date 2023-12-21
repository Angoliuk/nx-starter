import { type ExecutionContext, createParamDecorator } from "@nestjs/common";

export const GetUserData = createParamDecorator((_, context: ExecutionContext): { email: string; userId: string } => {
  const request = context.switchToHttp().getRequest();
  return {
    email: request.user.email
    userId: request.user.userId
  };
});
