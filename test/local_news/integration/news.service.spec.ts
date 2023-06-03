import { Test, TestingModule } from '@nestjs/testing';

import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../../../src/auth/application/auth.service';
import { UserRepository } from '../../../src/auth/domain/UserRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from '../../../src/config/db';
import { AuthModule } from '../../../src/auth/auth.module';
import { NewRepository } from '../../../src/local_news/domain/NewRepository';
import { NewRepositoryMysql } from '../../../src/local_news/infraestructure/NewRepositoryMysql';
import { NewsService } from '../../../src/local_news/application/news.service';
import { LocalNewsModule } from '../../../src/local_news/local.news.module';

const newsRepositoryProvider = { provide: NewRepository, useClass: NewRepositoryMysql };

describe('NewsService', () => {
  let service: NewsService;
  let newRepository: NewRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(dbConfig), AuthModule, LocalNewsModule],
      providers: [JwtService],
    }).compile();

    service = module.get<NewsService>(NewsService);
    newRepository = module.get<NewRepository>(NewRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should save a new', async () => {
    expect(
      await newRepository.saveNew(
        { 
          id: 2, 
          title: "title 13", 
          content: "Content 13", 
          image: "https://www.test.com/image_test.jpg" 
        }
      )
    ).toBe(true);
  });

  it('should get an exisitng new', async () => {
    expect(await newRepository.getNew(2)).toEqual(
      { 
        id: 2, 
        title: "title 13", 
        content: "Content 13", 
        image: "https://www.test.com/image_test.jpg" 
      }
    );

  });

  it('should delete an exisitng new', async () => {
    expect(await newRepository.deleteNew(2)).toBe(true);
  });

  afterAll(async () => await newRepository.deleteNew(2));
});
