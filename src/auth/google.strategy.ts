import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  private readonly logger: Logger = new Logger();

  constructor(private readonly configService: ConfigService, private readonly authService: AuthService) {
    super({
      clientID: configService.getOrThrow<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.getOrThrow<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL'),
      scope: configService.get<string>('GOOGLE_SCOPES')?.split(','),
    });
  }

  public async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { emails, displayName } = profile;
    const user = await this.authService.validateUser({ email: emails![0].value, displayName });
    return user || null;
  }
}
