import { ForbiddenError } from "@/shared/utils";
import { Injectable } from "@nestjs/common/decorators";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

import { TokenUser } from "../../../validation";
import { EnvService } from "../../env";
import { AuthService } from "../auth.service";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
  constructor(envService: EnvService, private authService: AuthService) {
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

  async validate(req: Request, payload: object): Promise<(TokenUser & { refreshToken: string }) | undefined> {
    const refreshToken = req?.cookies?.refreshToken;

    if (!refreshToken) throw new ForbiddenError();

    const user = await this.authService.getTokenUserFromPayload(payload);

    return {
      ...user,
      refreshToken,
    };
  }
}
