import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule } from "@nestjs/swagger";
import { contract } from "@nx-starter/shared";
import { generateOpenApi } from "@ts-rest/open-api";

import { ErrorFilter } from "./middlewares";
import { AppModule } from "./modules/app.module";

const port = process.env.PORT || 8080;
const globalPrefix = "api";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new ErrorFilter());

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

  await app.listen(port, () => Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`));
}

bootstrap();
