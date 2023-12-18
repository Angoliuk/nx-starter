import { Environment } from "./env";

export const { NODE_ENV } = Environment.config(process.env.env);
