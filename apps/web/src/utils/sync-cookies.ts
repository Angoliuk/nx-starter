"use server";

import { cookies } from "next/headers";
import { z } from "zod";

const cookiesOptionsSchema = z
  .object({
    domain: z.string(),
    expires: z.coerce.number().or(z.coerce.date()),
    httpOnly: z.coerce.boolean(),
    maxAge: z.coerce.number(),
    partitioned: z.coerce.boolean(),
    path: z.string(),
    priority: z.enum(["high", "low", "medium"]),
    sameSite: z.enum(["lax", "none", "strict"]),
    secure: z.coerce.boolean(),
  })
  .partial();

export async function syncCookies(newCookies: string[]) {
  "use server";
  for (const cookie of newCookies) {
    const [nameValue, ...cookiesParams] = cookie.split("; ");
    const [name, value] = nameValue.split("=");

    const options = cookiesParams.reduce<Record<string, string>>((cookiesOptions, option) => {
      const [optionKey, optionValue] = option.split("=");
      cookiesOptions[optionKey.toLowerCase()] = optionValue;
      return cookiesOptions;
    }, {});

    const { data: parsedOptions, success: isCookiesOptionsValid } =
      cookiesOptionsSchema.safeParse(options);

    if (!isCookiesOptionsValid) continue;

    cookies().set(name, value, {
      ...parsedOptions,
    });
  }
}
