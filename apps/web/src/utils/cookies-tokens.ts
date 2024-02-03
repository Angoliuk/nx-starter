"use server";
import { cookiesUtil } from "@/web-shared/utils";

export const cookiesTokens = async () => ({
  accessToken: cookiesUtil<string>("accessToken"),
  refreshToken: cookiesUtil<string>("refreshToken"),
});
