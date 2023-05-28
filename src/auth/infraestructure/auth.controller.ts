
import { Controller, Post, Inject, HttpException, HttpStatus, HttpCode, Body, UseGuards, Response } from '@nestjs/common';
import { Response as Resp } from 'express';
import { AuthService } from '../application/auth.service';
import { User } from '../domain/User';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './strategies/local-auth.guard';

@Controller()
export class AuthController {

  constructor(@Inject(AuthService) private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('auth/login')
  async login(@Body() user: User, @Response() resp: Resp) {
    const result: any = await this.authService.login(user);
    if (!result) throw new HttpException('Incorrect user or password', HttpStatus.NOT_FOUND);
    return resp.setHeader('Authorization', result.access_token).send();
    //return result;
  }

  @Post('auth/signup')
  async signup(@Body() user: User) {
    try {
      const result: boolean = await this.authService.save(user);
      if (result) return;
      throw new HttpException('Error creating user', HttpStatus.BAD_REQUEST);
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
