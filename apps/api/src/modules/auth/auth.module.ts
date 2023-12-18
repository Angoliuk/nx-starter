import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { UsersModule } from "../users";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AccessTokenStrategy, RefreshTokenStrategy } from "./strategies";

@Module({
  controllers: [AuthController],
  imports: [JwtModule.register({}), UsersModule],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
