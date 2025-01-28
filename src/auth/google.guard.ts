import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import e from 'express';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  public async canActivate(context: ExecutionContext) {
    const activate = (await super.canActivate(context)) as boolean;
    const request: e.Request = context.switchToHttp().getRequest();

    await super.logIn(request);
    return activate;
  }
}
