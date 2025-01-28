import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  private readonly logger: Logger = new Logger();

  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.getOrThrow<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.getOrThrow<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL'),
      scope: configService.get<string>('GOOGLE_SCOPES')?.split(','),
    });
  }

  public validate(accessToken: string, refreshToken: string, profile: Profile) {
    this.logger.log({ accessToken });
    this.logger.log({ refreshToken });
    this.logger.log({ profile });
  }
}
