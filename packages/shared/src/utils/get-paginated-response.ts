import { PaginationResponseSchema } from "./validation";

export const getPaginatedResponse = <T extends unknown[]>(
  items: T,
  pagination: Omit<PaginationResponseSchema, "totalPages">,
): { items: T; pagination: PaginationResponseSchema } => {
  return {
    items,
    pagination: {
      ...pagination,
      page: pagination.page < 1 ? 1 : pagination.page,
      totalPages: Math.max(Math.ceil(pagination.count / pagination.limit), 1),
    },
  };
};
