import { initContract } from "@ts-rest/core";

import { authContract } from "./auth-contract";
import { usersContract } from "./users-contract";

const c = initContract();

export const contract = c.router(
  {
    auth: authContract(c),
    users: usersContract(c),
  },
  {
    pathPrefix: "/api",
    strictStatusCodes: true,
  },
);
