import { Injectable } from "@nestjs/common/decorators";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
      secretOrKey: 'configService.get<string>("REFRESH_SECRET_TOKEN")',
      // secretOrKey: configService.get<string>("REFRESH_SECRET_TOKEN"),
    });
  }

  validate(req: Request, payload: object) {
    const refreshToken = req.get("authorization")?.replace("Bearer", "").trim();
    return {
      ...payload,
      refreshToken,
    };
  }
}
