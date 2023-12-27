import { Injectable } from "@nestjs/common/decorators";
import { PassportStrategy } from "@nestjs/passport";
import { ForbiddenError } from "@nx-starter/shared";
import { ExtractJwt, Strategy } from "passport-jwt";

import { TokenUser, tokenUser } from "../../../validation";
import { EnvService } from "../../env";
import { UsersService } from "../../users";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(envService: EnvService, private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: envService.get("ACCESS_SECRET_TOKEN"),
    });
  }

  async validate(payload: object): Promise<TokenUser | undefined> {
    const userValidationResult = tokenUser.safeParse(payload);

    if (!userValidationResult.success) throw new ForbiddenError();

    const user = await this.usersService.findOne({
      where: { email: userValidationResult.data.email, id: userValidationResult.data.userId },
    });

    return user ? { email: user.email, userId: user.id } : undefined;
  }
}
