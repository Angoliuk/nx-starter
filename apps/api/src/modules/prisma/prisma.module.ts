import { Global, Module } from "@nestjs/common";

import { PrismaService } from "./prisma.service";

@Global()
@Module({
  controllers: [],
  exports: [PrismaService],
  imports: [],
  providers: [PrismaService],
})
export class PrismaModule {}
