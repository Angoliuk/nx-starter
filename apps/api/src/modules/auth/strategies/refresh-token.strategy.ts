import { Injectable } from "@nestjs/common/decorators";
import { PassportStrategy } from "@nestjs/passport";
import { ForbiddenError } from "@/shared/utils";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

import { EnvService } from "../../env";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
  constructor(envService: EnvService) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromExtractors([RefreshTokenStrategy.extractJWTFromCookie]),
      passReqToCallback: true,
      secretOrKey: envService.get("REFRESH_SECRET_TOKEN"),
    });
  }

  private static extractJWTFromCookie(req: Request): null | string {
    return req?.cookies?.accessToken ?? null;
  }

  validate(req: Request, payload: object) {
    const refreshToken = req?.cookies?.refreshToken;

    if (!refreshToken) throw new ForbiddenError();

    return {
      ...payload,
      refreshToken,
    };
  }
}
