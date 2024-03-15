import { contract } from "@/shared/api";
import { initClient } from "@ts-rest/core";
import { cookies } from "next/headers";

import { API_BASE_URL } from "../env";

export const api = initClient(contract, {
  api: async ({ body, cache, credentials = "include", headers, method, next, path, route, signal }) => {
    const result = await fetch(path, {
      body,
      cache,
      credentials,
      headers: {
        Cookie: cookies()
          .getAll()
          .map(cookie => `${cookie.name}=${cookie.value}`)
          .join(";"),
        ...headers,
      },
      method,
      next,
      signal,
    });

    const contentType = result.headers.get("content-type");

    if (contentType?.includes("application/") && contentType?.includes("json")) {
      if (!route.validateResponseOnClient) {
        return {
          body: await result.json(),
          headers: result.headers,
          status: result.status,
        };
      }

      const jsonData = await result.json();
      const statusCode = result.status;
      const response = route.responses[statusCode];

      return {
        body: response && typeof response !== "symbol" && "parse" in response ? response?.parse(jsonData) : jsonData,
        headers: result.headers,
        status: statusCode,
      };
    }

    if (contentType?.includes("text/")) {
      return {
        body: await result.text(),
        headers: result.headers,
        status: result.status,
      };
    }

    return {
      body: await result.blob(),
      headers: result.headers,
      status: result.status,
    };
  },
  baseHeaders: {},
  baseUrl: API_BASE_URL,
});
