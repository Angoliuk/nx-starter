import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { LoggerMiddleware } from "../middlewares";
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
