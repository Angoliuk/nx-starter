import { NotFoundError, formatResponse, getPaginatedResponse } from "@/shared/utils";
import { webContract } from "@/web-shared/api";
import { Controller, UseGuards } from "@nestjs/common";
import { TsRest, TsRestHandler, tsRestHandler } from "@ts-rest/nest";

import { AccessTokenGuard } from "../../guards";
import { getPaginationSelectFromQuery } from "../../utils";
import { UsersService } from "./users.service";

@Controller()
@TsRest({ validateResponses: true })
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AccessTokenGuard)
  @TsRestHandler(webContract.users.create)
  async create() {
    return tsRestHandler(webContract.users.create, async ({ body }) => {
      const user = await this.usersService.create({ data: body });

      return formatResponse(user);
    });
  }

  @UseGuards(AccessTokenGuard)
  @TsRestHandler(webContract.users.delete)
  async delete() {
    return tsRestHandler(webContract.users.delete, async ({ params }) => {
      const user = await this.usersService.delete({ where: { id: params.userId } });

      return formatResponse(user);
    });
  }

  @UseGuards(AccessTokenGuard)
  @TsRestHandler(webContract.users.get)
  async get() {
    return tsRestHandler(webContract.users.get, async ({ query }) => {
      const { limit, orderBy, page } = query;

      const users = await this.usersService.get({
        orderBy,
        ...getPaginationSelectFromQuery(page, limit),
      });
      const count = await this.usersService.count({});

      const response = getPaginatedResponse(users, {
        count,
        limit,
        page,
      });
      return formatResponse(response);
    });
  }

  @UseGuards(AccessTokenGuard)
  @TsRestHandler(webContract.users.getById)
  async getById() {
    return tsRestHandler(webContract.users.getById, async ({ params }) => {
      const user = await this.usersService.getOne({ where: { id: params.userId } });

      if (!user) return formatResponse(new NotFoundError("User not found"));

      return formatResponse(user);
    });
  }

  @UseGuards(AccessTokenGuard)
  @TsRestHandler(webContract.users.update)
  async update() {
    return tsRestHandler(webContract.users.update, async ({ body, params }) => {
      const user = await this.usersService.update({ data: body, where: { id: params.userId } });

      return formatResponse(user);
    });
  }
}
