import { Environment } from "./env";

export const { API_BASE_URL, NODE_ENV } = Environment.config(process.env);
