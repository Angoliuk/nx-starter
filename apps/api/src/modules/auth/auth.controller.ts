import { ForbiddenError, formatResponse } from "@/shared/utils";
import { webContract } from "@/web-shared/api";
import { Controller, Req, Res, UseGuards } from "@nestjs/common";
import { TsRest, TsRestHandler, tsRestHandler } from "@ts-rest/nest";
import { Request, Response } from "express";

import { GetUser } from "../../decorators";
import { AccessTokenGuard, RefreshTokenGuard } from "../../guards";
import { TokenUser } from "../../validation";
import { AuthService } from "./auth.service";

@Controller()
@TsRest({ validateResponses: true })
export class AuthController {
  constructor(private authService: AuthService) {}

  @TsRestHandler(webContract.auth.logout)
  async logout(@Res({ passthrough: true }) res: Response) {
    return tsRestHandler(webContract.auth.logout, async () => {
      const logoutResponse = await this.authService.logout();
      await this.authService.removeTokensFromCookies({ res });
      return formatResponse(logoutResponse);
    });
  }

  @UseGuards(AccessTokenGuard)
  @TsRestHandler(webContract.auth.me)
  async me(
    @GetUser()
    user: TokenUser,
  ) {
    return tsRestHandler(webContract.auth.me, async () => {
      const meResponse = await this.authService.me(user.userId);
      return formatResponse(meResponse);
    });
  }

  @UseGuards(RefreshTokenGuard)
  @TsRestHandler(webContract.auth.refreshTokens)
  async refreshTokens(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
    return tsRestHandler(webContract.auth.refreshTokens, async () => {
      if (!req.user) return formatResponse(new ForbiddenError("Wrong user"));

      const refreshTokensResponse = await this.authService.signTokens({
        userId: req.user.userId,
      });

      this.authService.addTokensToCookies({
        accessToken: refreshTokensResponse.accessToken,
        refreshToken: refreshTokensResponse.refreshToken,
        res,
      });

      return formatResponse(refreshTokensResponse);
    });
  }

  @TsRestHandler(webContract.auth.signIn)
  async signIn(@Res({ passthrough: true }) res: Response) {
    return tsRestHandler(webContract.auth.signIn, async ({ body }) => {
      const signedInUser = await this.authService.signIn(body);

      if ("accessToken" in signedInUser) {
        this.authService.addTokensToCookies({
          accessToken: signedInUser.accessToken,
          refreshToken: signedInUser.refreshToken,
          res,
        });
      }

      return formatResponse(signedInUser);
    });
  }

  @TsRestHandler(webContract.auth.signUp)
  async signUp(@Res({ passthrough: true }) res: Response) {
    return tsRestHandler(webContract.auth.signUp, async ({ body }) => {
      const signedUpUser = await this.authService.signUp(body);

      if ("accessToken" in signedUpUser) {
        this.authService.addTokensToCookies({
          accessToken: signedUpUser.accessToken,
          refreshToken: signedUpUser.refreshToken,
          res,
        });
      }

      return formatResponse(signedUpUser);
    });
  }
}
