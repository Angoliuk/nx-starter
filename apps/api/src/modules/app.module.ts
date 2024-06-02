import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";

import { LoggerMiddleware } from "../middlewares";
import { AuthModule } from "./auth";
import { EnvModule } from "./env";
import { PrismaModule } from "./prisma";
import { UsersModule } from "./users";

@Module({
  imports: [PrismaModule, EnvModule, AuthModule, UsersModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
