
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import { AuthService } from '../../application/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new HttpException('Incorrect user or password', HttpStatus.NOT_FOUND);;
    }
    return user;
  }
}
