import { contract } from "@/shared/api";
import { formatResponse } from "@/shared/utils";
import { Controller, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { TsRest, TsRestHandler, tsRestHandler } from "@ts-rest/nest";
import { Response } from "express";

import { GetUser } from "../../decorators";
import { TokenUser } from "../../validation";
import { AuthService } from "./auth.service";

@Controller()
@TsRest({ validateResponses: true })
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard("jwt"))
  @TsRestHandler(contract.auth.logout)
  async logout(
    @GetUser()
    user: TokenUser,
  ) {
    return tsRestHandler(contract.auth.logout, async () => {
      const logoutResponse = await this.authService.logout({ userId: user.userId });
      return formatResponse(logoutResponse);
    });
  }

  @TsRestHandler(contract.auth.refreshTokens)
  async refreshTokens(@Res({ passthrough: true }) res: Response) {
    return tsRestHandler(contract.auth.refreshTokens, async ({ body }) => {
      const refreshTokensResponse = await this.authService.refreshTokens(body);

      if ("accessToken" in refreshTokensResponse)
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

      if ("accessToken" in signedInUser)
        this.authService.addTokensToCookies({
          accessToken: signedInUser.accessToken,
          refreshToken: signedInUser.refreshToken,
          res,
        });

      return formatResponse(signedInUser);
    });
  }

  @TsRestHandler(contract.auth.signUp)
  async signUp() {
    return tsRestHandler(contract.auth.signUp, async ({ body }) => {
      const signedUpUser = await this.authService.signUp(body);
      return formatResponse(signedUpUser);
    });
  }
}
