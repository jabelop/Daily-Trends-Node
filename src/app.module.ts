import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './config/db';
import { UserRepository } from './auth/domain/UserRepository';
import { UserRepositoryMysql } from './auth/infraestructure/UserRepositoryMysql';
import { AuthModule } from './auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
import { LocalNewsModule } from './local_news/local.news.module';
import { ScrapedNewsModule } from './scraped_news/scraped.news.module';

const userRepositoryProvider = {provide: UserRepository, useClass: UserRepositoryMysql};

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), AuthModule, LocalNewsModule, ScrapedNewsModule],
  controllers: [],
  providers: [JwtService],
})
export class AppModule {
  constructor(private dataSource: DataSource){}
}
