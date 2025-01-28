import { Controller, Get, HttpCode, HttpStatus, Logger, Req, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './google.guard';
import e from 'express';

@Controller('auth')
export class AuthController {
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  public handleLogin() {
    return { msg: 'Google auth login' };
  }

  @Get('google/redirect')
  @HttpCode(HttpStatus.TEMPORARY_REDIRECT)
  @UseGuards(GoogleAuthGuard)
  public handleRedirect() {
    return { msg: 'OK' };
  }

  @Get('status')
  public userStatus(@Req() request: e.Request) {
    Logger.log(request.user);
    if (request.user) {
      return { msg: 'Authenticated' };
    }
    return HttpStatus.UNAUTHORIZED;
  }
}
