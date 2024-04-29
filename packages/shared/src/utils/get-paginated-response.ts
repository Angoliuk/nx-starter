import { PaginationResponseSchema } from "../validation";

export const getPaginatedResponse = <T extends unknown[]>(items: T, pagination: PaginationResponseSchema) => {
  return {
    items,
    pagination,
  };
};
