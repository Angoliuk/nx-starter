import { Injectable } from "@nestjs/common/decorators";
import { PassportStrategy } from "@nestjs/passport";
import { ForbiddenError } from "@nx-starter/shared/utils";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

import { EnvService } from "../../env";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
  constructor(envService: EnvService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
      secretOrKey: envService.get("REFRESH_SECRET_TOKEN"),
    });
  }

  validate(req: Request, payload: object) {
    const refreshToken = req.get("authorization")?.replace("Bearer", "").trim();

    if (!refreshToken) throw new ForbiddenError();

    return {
      ...payload,
      refreshToken,
    };
  }
}
