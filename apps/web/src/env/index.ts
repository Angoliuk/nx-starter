import { Environment } from "./env";

export const { NEXT_PUBLIC_API_BASE_URL: API_BASE_URL } = Environment.config(process.env);
