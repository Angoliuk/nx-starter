import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { PrismaModule } from "../prisma";
import { UsersService } from "./users.service";

@Module({
  exports: [UsersService],
  imports: [JwtModule, PrismaModule],
  providers: [UsersService],
})
export class UsersModule {}
