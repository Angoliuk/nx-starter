import { Module } from "@nestjs/common";

import { PrismaModule } from "../prisma";
import { UsersService } from "./users.service";

@Module({
  exports: [UsersService],
  imports: [PrismaModule],
  providers: [UsersService],
})
export class UsersModule {}
