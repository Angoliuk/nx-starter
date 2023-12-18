import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule } from "@nestjs/swagger";
import { contract } from "@nx-starter/shared";
import { generateOpenApi } from "@ts-rest/open-api";

import { AppModule } from "./modules/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = "api";
  // app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;

  const document = generateOpenApi(
    contract,
    {
      info: {
        title: "API",
        version: "1.0.0",
      },
    },
    {
      setOperationId: true,
    },
  );

  SwaggerModule.setup("api-docs", app, document);

  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
