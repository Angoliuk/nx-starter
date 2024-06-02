export const STATUS_CODES = {
  BAD_REQUEST: 400 as const,
  FORBIDDEN: 403 as const,
  NOT_FOUND: 404 as const,
  SERVER_ERROR: 500 as const,
  SUCCESS: 200 as const,
  TIMEOUT_ERROR: 408 as const,
} as const;

export type StatusCodes = (typeof STATUS_CODES)[keyof typeof STATUS_CODES];
