import { Injectable } from "@nestjs/common/decorators";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'config.get<string>("ACCESS_SECRET_TOKEN")',
      // secretOrKey: config.get<string>("ACCESS_SECRET_TOKEN"),
    });
  }

  validate(payload: object) {
    return payload;
  }
}
