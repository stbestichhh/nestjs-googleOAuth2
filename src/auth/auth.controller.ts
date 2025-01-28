import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './google.guard';

@Controller('auth')
@UseGuards(GoogleAuthGuard)
export class AuthController {
  @Get('google/login')
  public handleLogin() {
    return { msg: 'Google auth login' };
  }

  @Get('google/redirect')
  @HttpCode(HttpStatus.TEMPORARY_REDIRECT)
  public handleRedirect() {
    return { msg: 'Google redirect' };
  }
}
