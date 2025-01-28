import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger } from '@nestjs/common';

async function bootstrap() {
  const PORT = process.env.PORT ?? 9180;
  const logger = new ConsoleLogger({
    json: true,
    colors: true,
  });

  const app = await NestFactory.create(AppModule, {
    logger,
  });

  app.setGlobalPrefix('api');

  await app.listen(PORT, () => {
    logger.log(`Server is running on http://localhost:${PORT}`);
  });
}
bootstrap();
