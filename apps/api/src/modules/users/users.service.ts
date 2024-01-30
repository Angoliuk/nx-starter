import type { DefaultArgs } from "@prisma/client/runtime/library";

import { Injectable } from "@nestjs/common";
import { Prisma } from "@/db";
import * as argon2 from "argon2";

import { PrismaService } from "../prisma";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create({ data, select }: Prisma.UserCreateArgs<DefaultArgs>) {
    const passwordHash = await argon2.hash(data.password);
    return await this.prisma.user.create({ data: { ...data, password: passwordHash }, select });
  }

  async delete(deleteData: Prisma.UserDeleteArgs<DefaultArgs>) {
    return await this.prisma.user.delete(deleteData);
  }

  async find(findData: Prisma.UserFindManyArgs<DefaultArgs>) {
    return await this.prisma.user.findMany(findData);
  }

  async findOne(findData: Prisma.UserFindUniqueArgs<DefaultArgs>) {
    return await this.prisma.user.findUnique(findData);
  }

  async update(updateData: Prisma.UserUpdateArgs<DefaultArgs>) {
    return await this.prisma.user.update(updateData);
  }
}
