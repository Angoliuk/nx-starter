"use server";
import { cookiesUtil } from "@/ui-shared/utils/cookies";

export const cookiesTokens = async () => ({
  accessTokenCookie: cookiesUtil<string>("accessToken"),
  refreshTokenCookie: cookiesUtil<string>("refreshToken"),
});

export const getCookieTokens = async () => {
  const { accessTokenCookie, refreshTokenCookie } = await cookiesTokens();
  let cookie = "";

  const accessToken = accessTokenCookie.get();
  if (accessToken) {
    cookie += `${accessTokenCookie.key}=${accessToken};`;
  }

  const refreshToken = refreshTokenCookie.get();
  if (refreshToken) {
    cookie += `${refreshTokenCookie.key}=${refreshToken};`;
  }

  return cookie;
};
