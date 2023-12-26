import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { envSchema } from "../validation";
import { AuthModule } from "./auth";
import { EnvModule } from "./env";
import { PrismaModule } from "./prisma";
import { UsersModule } from "./users";

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validate: env => envSchema.parse(env),
    }),
    EnvModule,
    PrismaModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
