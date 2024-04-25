import { contract } from "@/shared/api";
import { ForbiddenError, formatResponse } from "@/shared/utils";
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

  @UseGuards(AccessTokenGuard)
  @TsRestHandler(contract.auth.logout)
  async logout(
    @GetUser()
    user: TokenUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    return tsRestHandler(contract.auth.logout, async () => {
      const logoutResponse = await this.authService.logout();
      await this.authService.removeTokensFromCookies({ res });
      return formatResponse(logoutResponse);
    });
  }

  @UseGuards(RefreshTokenGuard)
  @TsRestHandler(contract.auth.refreshTokens)
  async refreshTokens(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
    return tsRestHandler(contract.auth.refreshTokens, async () => {
      if (!req.user) return formatResponse(new ForbiddenError("Wrong user"));

      const refreshTokensResponse = await this.authService.signTokens({
        email: req.user.email,
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

  @TsRestHandler(contract.auth.signIn)
  async signIn(@Res({ passthrough: true }) res: Response) {
    return tsRestHandler(contract.auth.signIn, async ({ body }) => {
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

  @TsRestHandler(contract.auth.signUp)
  async signUp(@Res({ passthrough: true }) res: Response) {
    return tsRestHandler(contract.auth.signUp, async ({ body }) => {
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
