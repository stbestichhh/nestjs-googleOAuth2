import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import { v7 as uuidv7 } from 'uuid';

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
  app.use(
    session({
      secret: uuidv7(),
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60000,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(PORT, () => {
    logger.log(`Server is running on http://localhost:${PORT}`);
  });
}
bootstrap();
