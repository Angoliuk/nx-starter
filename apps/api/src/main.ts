import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule } from "@nestjs/swagger";
import { contract } from "@/shared/api";
import { generateOpenApi } from "@ts-rest/open-api";
import cookieParser from "cookie-parser";

import { ErrorFilter } from "./middlewares";
import { AppModule } from "./modules/app.module";

const port = process.env.PORT || 8080;
const globalPrefix = "api";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: { origin: "*" } });

  app.useGlobalFilters(new ErrorFilter());
  app.use(cookieParser());

  const document = generateOpenApi(contract, {
    info: {
      title: "API",
      version: "1.0.0",
    },
  });

  SwaggerModule.setup("api-docs", app, document);

  await app.listen(port, () => Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`));
}

bootstrap();
