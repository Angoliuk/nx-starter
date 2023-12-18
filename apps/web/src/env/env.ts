import { cleanEnv, num as number, str as string, url } from "envalid";

export class Environment {
  public static config(env: unknown) {
    return cleanEnv(env, {
      NODE_ENV: string({ desc: "Node environment", example: "development", default: "development" }),
    });
  }
}
