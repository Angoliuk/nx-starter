import { cookies } from "next/headers";

const oneDay = 24 * 60 * 60 * 1000;

export const cookiesUtil = <T>(key: string) => ({
  delete: () => cookies().delete(key),
  get: () => {
    // TODO: use zod for validation of values
    const response = cookies().get(key)?.value;

    if (!response) return null;
    try {
      return JSON.parse(response) as T;
    } catch (e) {
      return response;
    }
  },
  key,
  set: (value: T, expires?: number) => {
    cookies().set(key, JSON.stringify(value), {
      expires: expires ?? Date.now() + oneDay,
      httpOnly: true,
      sameSite: "strict",
    });
  },
});
