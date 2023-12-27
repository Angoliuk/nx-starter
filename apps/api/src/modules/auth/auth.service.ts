import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import {
  ForbiddenError,
  NotFoundError,
  SignInBodySchema,
  SignUpBodySchema,
  TokensSchema,
  UserId,
} from "@nx-starter/shared";
import * as argon2 from "argon2";

import { EnvService } from "../env";
import { UsersService } from "../users";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService, private envService: EnvService) {}

  async logout({ userId }: UserId) {
    await this.usersService.update({ data: { hashedRt: "" }, where: { id: userId } });

    return {};
  }

  async refreshTokens({ accessToken: expiredAccessToken, refreshToken: expiredRefreshToken }: TokensSchema) {
    const tokenData = this.jwtService.decode(expiredAccessToken);

    if (!tokenData || !tokenData.userId) return new ForbiddenError("Wrong data in token");

    const user = await this.usersService.findOne(tokenData.userId);

    if (!user) return new NotFoundError();

    const refreshTokenMatches = await argon2.verify(user.hashedRt, expiredRefreshToken);

    if (!refreshTokenMatches) return new ForbiddenError("Incorrect refresh token");

    const tokens = await this.signAndUpdateTokens({ email: user.email, userId: user.id });

    return tokens;
  }

  async signAndUpdateTokens(tokensBody: UserId & { email: string }) {
    const tokens = await this.signTokens(tokensBody);

    await this.updateRefreshToken({ refreshToken: tokens.refreshToken, userId: tokensBody.userId });

    return tokens;
  }

  async signIn({ email, password }: SignInBodySchema) {
    const user = await this.usersService.findOne({ where: { email } });

    if (!user) return new NotFoundError("User do not exists");

    const isPasswordsMatch = await argon2.verify(user.password, password);

    if (!isPasswordsMatch) return new ForbiddenError("Incorrect password");

    const tokens = await this.signAndUpdateTokens({ email: user.email, userId: user.id });

    return { email: user.email, id: user.id, ...tokens };
  }

  async signTokens({ email, userId }: UserId & { email: string }) {
    const tokenBody = {
      email,
      userId,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(tokenBody, {
        expiresIn: this.envService.get("ACCESS_SECRET_TOKEN_EXPIRES_IN"),
        secret: this.envService.get("ACCESS_SECRET_TOKEN"),
      }),
      this.jwtService.signAsync(tokenBody, {
        expiresIn: this.envService.get("REFRESH_SECRET_TOKEN_EXPIRES_IN"),
        secret: this.envService.get("REFRESH_SECRET_TOKEN"),
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async signUp(body: SignUpBodySchema) {
    const existingUser = await this.usersService.findOne({ where: { email: body.email } });

    if (existingUser) return new ForbiddenError(`User with email ${existingUser.email} already exists`);

    const createdUser = await this.usersService.create({ data: body });

    const tokens = await this.signAndUpdateTokens({ email: createdUser.email, userId: createdUser.id });

    return {
      email: createdUser.email,
      id: createdUser.id,
      ...tokens,
    };
  }

  async updateRefreshToken({ refreshToken, userId }: UserId & { refreshToken: string }) {
    const hash = await argon2.hash(refreshToken);
    await this.usersService.update({ data: { hashedRt: hash }, where: { id: userId } });
  }
}
