import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './config/db';
import { UserRepository } from './auth/domain/UserRepository';
import { UserRepositoryMysql } from './auth/infraestructure/UserRepositoryMysql';
import { AuthModule } from './auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { DataSource } from 'typeorm';

const userRepositoryProvider = {provide: UserRepository, useClass: UserRepositoryMysql};

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), AuthModule],
  controllers: [],
  providers: [JwtService],
})
export class AppModule {
  constructor(private dataSource: DataSource){}
}
