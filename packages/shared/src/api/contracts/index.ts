import { initContract } from "@ts-rest/core";

import { authContract } from "./auth-contract";

const c = initContract();

export const contract = c.router(
  {
    auth: authContract(c),
  },
  {
    pathPrefix: "/api",
    strictStatusCodes: true,
  },
);
