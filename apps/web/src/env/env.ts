import { cleanEnv, str as string, url } from "envalid";

export class Environment {
  public static config(env: unknown) {
    return cleanEnv(env, {
      API_BASE_URL: url({ default: "http://localhost:8080", desc: "API url", example: "http://localhost:8080" }),
      NODE_ENV: string({ default: "development", desc: "Node environment", example: "development" }),
    });
  }
}
