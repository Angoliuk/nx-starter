import { Module } from "@nestjs/common";

import { PrismaService } from "./prisma.service";

@Module({
  controllers: [],
  exports: [PrismaService],
  imports: [],
  providers: [PrismaService],
})
export class PrismaModule {}
