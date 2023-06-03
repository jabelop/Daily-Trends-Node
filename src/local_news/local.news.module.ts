
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NewTypeOrm } from './infraestructure/NewTypeOrm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsController } from './infraestructure/news.controller';
import { NewsService } from './application/news.service';
import { NewRepository } from './domain/NewRepository';
import { NewRepositoryMysql } from './infraestructure/NewRepositoryMysql';
import { JwtStrategy } from '../auth/infraestructure/strategies/jwt-strategy';
import { NewRepositoryMongoose } from './infraestructure/mongoose_repository/NewRepositoryMongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { NewMongoose, NewMongooseSchema } from './infraestructure/mongoose_repository/NewMongoose';

const newRepositoryProvider = {provide: NewRepository, useClass: NewRepositoryMongoose};//useClass: NewRepositoryMysql};

@Module({
    imports: [ 
        //TypeOrmModule.forFeature([NewTypeOrm]),
        MongooseModule.forFeature([{ name: NewMongoose.name, schema: NewMongooseSchema }])
      ],
      controllers: [NewsController],
      providers: [NewsService, newRepositoryProvider, 
      JwtStrategy, JwtService],
})
export class LocalNewsModule {}
