import { Injectable } from "@nestjs/common/decorators";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

import { TokenUser } from "../../../validation";
import { EnvService } from "../../env";
import { AuthService } from "../auth.service";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
  constructor(
    envService: EnvService,
    private authService: AuthService,
  ) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromExtractors([RefreshTokenStrategy.extractJWTFromCookie]),
      secretOrKey: envService.get("REFRESH_SECRET_TOKEN"),
    });
  }

  private static extractJWTFromCookie(req: Request): null | string {
    return req?.cookies?.refreshToken ?? null;
  }

  async validate(payload: object): Promise<TokenUser | undefined> {
    const user = await this.authService.getTokenUserFromPayload(payload);

    return user;
  }
}
