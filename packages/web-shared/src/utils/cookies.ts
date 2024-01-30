import { cookies } from "next/headers";

const oneDay = 24 * 60 * 60 * 1000;

export const cookiesUtil = <T>(key: string) => ({
  delete: () => cookies().delete(key),
  get: () => {
    // TODO: use zod for validation of local storage
    const response = cookies().get(key);
    if (!response?.value) return null;
    try {
      return JSON.parse(response.value) as T;
    } catch (e) {
      return response;
    }
  },
  key,
  set: (value: T, expires?: number) => {
    cookies().set(key, JSON.stringify(value), { expires: expires ?? Date.now() - oneDay });
  },
});
