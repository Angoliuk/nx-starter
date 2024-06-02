import { webContract } from "@/web-shared/api";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule } from "@nestjs/swagger";
import { generateOpenApi } from "@ts-rest/open-api";
import cookieParser from "cookie-parser";

import { ErrorFilter } from "./middlewares";
import { AppModule } from "./modules/app.module";

const port = process.env.PORT || 8080;
const globalPrefix = "api";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: { credentials: true, origin: "*" } });

  app.useGlobalFilters(new ErrorFilter());
  app.use(cookieParser());

  const webDocument = generateOpenApi(webContract, {
    components: {
      securitySchemes: {
        cookieAuth: {
          in: "cookie",
          name: "accessToken",
          type: "apiKey",
        },
      },
    },
    info: {
      title: "API",
      version: "1.0.0",
    },
  });

  SwaggerModule.setup("web-api-docs", app, webDocument, {
    swaggerOptions: {
      withCredentials: true,
    },
  });

  await app.listen(port, () =>
    Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`),
  );
}

bootstrap();
