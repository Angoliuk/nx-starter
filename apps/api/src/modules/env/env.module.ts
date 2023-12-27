import { Global, Module } from "@nestjs/common";

import { EnvService } from "./env.service";

@Global()
@Module({
  exports: [EnvService],
  imports: [],
  providers: [EnvService],
})
export class EnvModule {}
