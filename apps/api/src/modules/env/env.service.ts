import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { EnvSchema } from "../../utils";

@Injectable()
export class EnvService {
  constructor(private configService: ConfigService<EnvSchema, true>) {}

  get<T extends keyof EnvSchema>(key: T) {
    return this.configService.get(key, { infer: true });
  }
}
