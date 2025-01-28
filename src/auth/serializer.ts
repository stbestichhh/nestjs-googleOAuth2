import { PassportSerializer } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserEntity } from '../typeorm/entities';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly authService: AuthService) {
    super();
  }

  public serializeUser(user: UserEntity, done: (...args: any[]) => any) {
    done(null, user);
    Logger.log(`Serialize`, user);
  }

  public async deserializeUser(payload: UserEntity, done: (...args: any[]) => any) {
    const user = await this.authService.findUser(payload.id);

    if (user) {
      done(null, user);
    } else {
      done(null, null);
    }
    Logger.log(`Deserialize`, user);
  }
}
