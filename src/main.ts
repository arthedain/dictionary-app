import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get("APP_PORT");

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
    }),
  );

  await app.listen(port || 8080);
}

bootstrap();
