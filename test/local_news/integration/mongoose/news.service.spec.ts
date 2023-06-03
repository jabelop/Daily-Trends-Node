import { Test, TestingModule } from '@nestjs/testing';

import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { NewRepositoryMongoose } from '../../../../src/local_news/infraestructure/mongoose_repository/NewRepositoryMongoose';
import { NewRepository } from '../../../../src/local_news/domain/NewRepository';
import { NewsService } from '../../../../src/local_news/application/news.service';
import { AuthModule } from '../../../../src/auth/auth.module';
import { LocalNewsModule } from '../../../../src/local_news/local.news.module';
import { New } from '../../../../src/local_news/domain/New';

const newsRepositoryProvider = { provide: NewRepository, useClass: NewRepositoryMongoose };

describe('NewsService', () => {
  let service: NewsService;
  let newRepository: NewRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ MongooseModule.forRoot('mongodb://localhost/daily_trends'), LocalNewsModule],
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
    const foundedNew: New = await newRepository.getNew(2);
    expect({
        id: foundedNew.id,
        title: foundedNew.title,
        content: foundedNew.content,
        image: foundedNew.image
    }).toEqual(
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
