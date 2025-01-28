import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { GoogleStrategy } from './google.strategy';

@Module({
  providers: [AuthService, GoogleStrategy],
  controllers: [AuthController],
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        GOOGLE_CLIENT_ID: Joi.string().required(),
        GOOGLE_CLIENT_SECRET: Joi.string().required(),
        GOOGLE_CALLBACK_URL: Joi.string().uri().required(),
        GOOGLE_SCOPES: Joi.string().pattern(/^(\w+)(,\w+)*$/).required(),
      }),
    }),
  ],
})
export class AuthModule {}
