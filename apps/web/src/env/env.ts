import { cleanEnv, str as string } from "envalid";

export class Environment {
  public static config(env: unknown) {
    return cleanEnv(env, {
      NODE_ENV: string({ default: "development", desc: "Node environment", example: "development" }),
    });
  }
}
