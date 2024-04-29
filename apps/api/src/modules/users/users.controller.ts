import { contract } from "@/shared/api";
import { NotFoundError, formatResponse, getPaginatedResponse } from "@/shared/utils";
import { Controller } from "@nestjs/common";
import { TsRest, TsRestHandler, tsRestHandler } from "@ts-rest/nest";

import { UsersService } from "./users.service";

@Controller()
@TsRest({ validateResponses: true })
export class UsersController {
  constructor(private usersService: UsersService) {}

  @TsRestHandler(contract.users.create)
  async create() {
    return tsRestHandler(contract.users.create, async ({ body }) => {
      const user = await this.usersService.create({ data: body });

      return formatResponse(user);
    });
  }

  @TsRestHandler(contract.users.delete)
  async delete() {
    return tsRestHandler(contract.users.delete, async ({ params }) => {
      const user = await this.usersService.delete({ where: { id: params.userId } });

      return formatResponse(user);
    });
  }

  @TsRestHandler(contract.users.get)
  async get() {
    return tsRestHandler(contract.users.get, async ({ query }) => {
      const { limit, orderBy, page } = query;
      const users = await this.usersService.get({ orderBy, skip: page, take: limit });

      const response = getPaginatedResponse(users, {
        limit,
        page,
      });

      return formatResponse(response);
    });
  }

  @TsRestHandler(contract.users.getById)
  async getById() {
    return tsRestHandler(contract.users.getById, async ({ params }) => {
      const user = await this.usersService.getOne({ where: { id: params.userId } });

      if (!user) return formatResponse(new NotFoundError("User not found"));

      return formatResponse(user);
    });
  }

  @TsRestHandler(contract.users.update)
  async update() {
    return tsRestHandler(contract.users.update, async ({ body, params }) => {
      const user = await this.usersService.update({ data: body, where: { id: params.userId } });

      return formatResponse(user);
    });
  }
}
