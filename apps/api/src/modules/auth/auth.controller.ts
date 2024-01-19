import { Controller, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { contract } from "@nx-starter/shared/api";
import { formatResponse } from "@nx-starter/shared/utils";
import { TsRest, TsRestHandler, tsRestHandler } from "@ts-rest/nest";

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
  async refreshTokens() {
    return tsRestHandler(contract.auth.refreshTokens, async ({ body }) => {
      const refreshTokensResponse = await this.authService.refreshTokens(body);
      return formatResponse(refreshTokensResponse);
    });
  }

  @TsRestHandler(contract.auth.signIn)
  async signIn() {
    return tsRestHandler(contract.auth.signIn, async ({ body }) => {
      const signedInUser = await this.authService.signIn(body);
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
