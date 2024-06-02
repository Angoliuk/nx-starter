import { Prisma } from "@/db";
import { Injectable } from "@nestjs/common";
import * as argon2 from "argon2";

import { PrismaService } from "../prisma";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async count<T extends Prisma.UserCountArgs>(
    countData: Prisma.SelectSubset<T, Prisma.UserCountArgs>,
  ) {
    return await this.prisma.user.count(countData);
  }

  async create<T extends Prisma.UserCreateArgs>({
    data,
    select,
  }: Prisma.SelectSubset<T, Prisma.UserCreateArgs>) {
    const passwordHash = await argon2.hash(data.password);
    const userData = { ...data, password: passwordHash };
    return await this.prisma.user.create({ data: userData, select });
  }

  async delete<T extends Prisma.UserDeleteArgs>(
    deleteData: Prisma.SelectSubset<T, Prisma.UserDeleteArgs>,
  ) {
    return await this.prisma.user.delete(deleteData);
  }

  async get<T extends Prisma.UserFindManyArgs>(
    getData: Prisma.SelectSubset<T, Prisma.UserFindManyArgs>,
  ) {
    return await this.prisma.user.findMany(getData);
  }

  async getOne<T extends Prisma.UserFindUniqueArgs>(
    getData: Prisma.SelectSubset<T, Prisma.UserFindUniqueArgs>,
  ) {
    return await this.prisma.user.findUnique(getData);
  }

  async update<T extends Prisma.UserUpdateArgs>(
    updateData: Prisma.SelectSubset<T, Prisma.UserUpdateArgs>,
  ) {
    return await this.prisma.user.update(updateData);
  }
}
