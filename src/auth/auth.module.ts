
import { Module } from '@nestjs/common';
import { AuthService } from './application/auth.service';
import { UserRepository } from './domain/UserRepository';
import { UserRepositoryMysql } from './infraestructure/UserRepositoryMysql';
import { UserTypeOrm } from './infraestructure/UserTypeOrm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from './infraestructure/auth.controller';
import { LocalStrategy } from './infraestructure/strategies/local.strategy';


const userRepositoryProvider = {provide: UserRepository, useClass: UserRepositoryMysql};

@Module({
  imports: [ 
    TypeOrmModule.forFeature([UserTypeOrm]),
  ],
  controllers: [AuthController],
  providers: [AuthService, userRepositoryProvider, 
  JwtService, LocalStrategy],
})
export class AuthModule {}
