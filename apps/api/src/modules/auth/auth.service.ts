import { ForbiddenError, NotFoundError } from "@/shared/utils";
import { SignInBodySchema, SignUpBodySchema, UserIdSchema } from "@/shared/validation";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as argon2 from "argon2";
import { Response } from "express";

import { tokenUser } from "../../validation";
import { EnvService } from "../env";
import { UsersService } from "../users";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService, private envService: EnvService) {}

  async addTokensToCookies({
    accessToken,
    refreshToken,
    res,
  }: {
    accessToken: string;
    refreshToken: string;
    res: Response;
  }) {
    res.cookie("accessToken", accessToken, {
      expires: new Date(Date.now() + this.envService.get("ACCESS_SECRET_TOKEN_EXPIRES_IN")),
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    res.cookie("refreshToken", refreshToken, {
      expires: new Date(Date.now() + this.envService.get("REFRESH_SECRET_TOKEN_EXPIRES_IN")),
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });
  }

  async getTokenUserFromPayload(payload: object) {
    const userValidationResult = tokenUser.safeParse(payload);

    if (!userValidationResult.success) throw new ForbiddenError();

    const user = await this.usersService.getOne({
      where: { email: userValidationResult.data.email, id: userValidationResult.data.userId },
    });

    if (!user) throw new NotFoundError("User not found");

    return {
      email: user.email,
      userId: user.id,
    };
  }

  async logout() {
    return null;
  }

  async removeTokensFromCookies({ res }: { res: Response }) {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
  }

  async signIn({ email, password }: SignInBodySchema) {
    const user = await this.usersService.getOne({ where: { email } });

    if (!user) return new NotFoundError("User do not exists");

    const isPasswordsMatch = await argon2.verify(user.password, password);

    if (!isPasswordsMatch) return new ForbiddenError("Incorrect password");

    const tokens = await this.signTokens({ email: user.email, userId: user.id });

    return { email: user.email, id: user.id, ...tokens };
  }

  async signTokens({ email, userId }: { email: string; userId: UserIdSchema }) {
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
    const existingUser = await this.usersService.getOne({ where: { email: body.email } });

    if (existingUser) return new ForbiddenError(`User with email ${existingUser.email} already exists`);

    const createdUser = await this.usersService.create({ data: body });

    const tokens = await this.signTokens({ email: createdUser.email, userId: createdUser.id });

    return {
      email: createdUser.email,
      id: createdUser.id,
      ...tokens,
    };
  }
}
