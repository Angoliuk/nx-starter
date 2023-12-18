import { initContract } from "@ts-rest/core";

import { authContract } from "./auth-contact";

const c = initContract();

export const contract = c.router(
  {
    auth: authContract(c),
  },
  { pathPrefix: "/api", strictStatusCodes: true },
);
