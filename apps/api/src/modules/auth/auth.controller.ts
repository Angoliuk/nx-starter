import { Controller, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { contract, formatResponse } from "@nx-starter/shared";
import { TsRestHandler, tsRestHandler } from "@ts-rest/nest";

import { GetUserData } from "../../decorators";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard("jwt"))
  @TsRestHandler(contract.auth.logout)
  async logout(
    @GetUserData()
    userData: {
      id: string;
    },
  ) {
    return tsRestHandler(contract.auth.logout, async () => {
      const logoutResponse = await this.authService.logout({ userId: userData.id });
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
