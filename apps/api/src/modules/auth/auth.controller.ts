import { Controller, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { contract } from "@nx-starter/shared";
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
      return logoutResponse;
    });
  }

  @TsRestHandler(contract.auth.refreshTokens)
  async refreshTokens() {
    return tsRestHandler(contract.auth.refreshTokens, async ({ body }) => {
      const refreshTokensResponse = await this.authService.refreshTokens(body);

      return refreshTokensResponse;
    });
  }

  @TsRestHandler(contract.auth.signIn)
  async signIn() {
    return tsRestHandler(contract.auth.signIn, async ({ body }) => {
      const signedInUserResponse = await this.authService.signIn(body);

      return signedInUserResponse;
    });
  }

  @TsRestHandler(contract.auth.signUp)
  async signUp() {
    return tsRestHandler(contract.auth.signUp, async ({ body }) => {
      const signedUpUser = await this.authService.signUp(body);

      return signedUpUser;
    });
  }

  //   @TsRestHandler(contract.auth)
  //   async handler() {
  //     return tsRestHandler(contract.auth, {
  //       logout: async () => {
  //         return {
  //           body: {},
  //           status: 201 as const,
  //         }
  // // return this.authService.logout()
  //       },
  //       refresh: async () => {
  //         return {
  //           body: {},
  //           status: 201 as const,
  //         }
  // // return this.authService.refreshTokens(body)
  //       },
  //       signIn: async () => {
  //         return {
  //           body: {},
  //           status: 201 as const,
  //         }
  // // return this.authService.signIn(body)
  //       },
  //       signUp: async () => {
  //         return {
  //           body: {},
  //           status: 201 as const,
  //         }
  //         // return this.authService.signUp(body)
  //       }
  //     });
  //   }

  // @UseGuards(AuthGuard("jwt"))
  // @ApiBearerAuth()
  // @TsRestHandler(contract.auth.logout)
  // async logout() {
  //   return tsRestHandler(contract.auth.logout, async () => {
  //     return {
  //       body: {},
  //       status: 201 as const,
  //     }
  //   });
  // }

  // @UseGuards(AuthGuard("jwt"))
  // @ApiBearerAuth()
  // @Post("logout")
  // @HttpCode(HttpStatus.OK)
  // @ApiResponse({
  //   description: "Logged out",
  //   status: HttpStatus.OK,
  // })
  // @ApiResponse({
  //   description: "Forbidden",
  //   status: HttpStatus.FORBIDDEN,
  // })
  // logout(@Req() req: unknown) {
  //   return this.authService.logout();
  // }

  // @Post("refresh")
  // @HttpCode(HttpStatus.OK)
  // @ApiResponse({
  //   description: "Tokens refreshed",
  //   status: HttpStatus.OK,
  // })
  // @ApiResponse({
  //   description: "Forbidden",
  //   status: HttpStatus.FORBIDDEN,
  // })
  // refreshTokens(@Body() body: unknown) {
  //   return this.authService.refreshTokens(body);
  // }

  // @Post("sign-in")
  // @HttpCode(HttpStatus.OK)
  // @ApiResponse({
  //   description: "Success",
  //   status: HttpStatus.OK,
  // })
  // @ApiResponse({
  //   description: "Forbidden",
  //   status: HttpStatus.FORBIDDEN,
  // })
  // signIn(@Body() body: unknown) {
  //   return this.authService.signIn(body);
  // }

  // @Post("sign-up")
  // @HttpCode(HttpStatus.CREATED)
  // @ApiResponse({
  //   description: "Success",
  //   status: HttpStatus.CREATED,
  // })
  // @ApiResponse({
  //   description: "Forbidden",
  //   status: HttpStatus.FORBIDDEN,
  // })
  // signUp(@Body() body: unknown) {
  //   return this.authService.signUp(body);
  // }
}
