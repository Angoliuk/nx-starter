import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AuthModule } from "./auth";
import { PrismaModule } from "./prisma";
import { UsersModule } from "./users";

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      // validationSchema: schema,
      // validate: (env) => schema.parse(env),
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
  ],
  providers: [],
})
export class AppModule {}
