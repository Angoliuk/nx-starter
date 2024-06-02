import { Injectable } from "@nestjs/common/decorators";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

import { TokenUser } from "../../../validation";
import { EnvService } from "../../env";
import { AuthService } from "../auth.service";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    envService: EnvService,
    private authService: AuthService,
  ) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromExtractors([AccessTokenStrategy.extractJWTFromCookie]),
      secretOrKey: envService.get("ACCESS_SECRET_TOKEN"),
    });
  }

  private static extractJWTFromCookie(req: Request): null | string {
    return req?.cookies?.accessToken ?? null;
  }

  async validate(payload: object): Promise<TokenUser | undefined> {
    const user = await this.authService.getTokenUserFromPayload(payload);

    return user;
  }
}
