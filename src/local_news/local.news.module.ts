
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NewTypeOrm } from './infraestructure/NewTypeOrm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsController } from './infraestructure/news.controller';
import { NewsService } from './application/news.service';
import { NewRepository } from './domain/NewRepository';
import { NewRepositoryMysql } from './infraestructure/NewRepositoryMysql';
import { JwtStrategy } from '../auth/infraestructure/strategies/jwt-strategy';

const newRepositoryProvider = {provide: NewRepository, useClass: NewRepositoryMysql};

@Module({
    imports: [ 
        TypeOrmModule.forFeature([NewTypeOrm]),
      ],
      controllers: [NewsController],
      providers: [NewsService, newRepositoryProvider, 
      JwtStrategy, JwtService],
})
export class LocalNewsModule {}
