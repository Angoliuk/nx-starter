import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { envSchema } from "../../validation";
import { EnvService } from "./env.service";

@Global()
@Module({
  exports: [EnvService],
  imports: [
    ConfigModule.forRoot({
      validate: env => envSchema.parse(env),
    }),
  ],
  providers: [EnvService],
})
export class EnvModule {}
