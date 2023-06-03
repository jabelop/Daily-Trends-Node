import { Test, TestingModule } from '@nestjs/testing';

import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../../../src/auth/application/auth.service';
import { UserTypeOrm } from '../../../src/auth/infraestructure/UserTypeOrm';
import { NewRepository } from '../../../src/local_news/domain/NewRepository';
import { NewRepositoryTest } from './NewRepositoryTest';
import { NewsService } from '../../../src/local_news/application/news.service';
import { UserRepository } from '../../../src/auth/domain/UserRepository';
import { UserRepositoryTest } from '../../auth/unit/userRespositoryTest';

const newRepositoryProvider = {provide: NewRepository, useClass: NewRepositoryTest};
const usersRepositoryProvider = {provide: UserRepository, useClass: UserRepositoryTest};

describe('NewsService', () => {
  let service: NewsService;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [newRepositoryProvider, usersRepositoryProvider, NewsService, JwtService, UserTypeOrm, AuthService],
    }).compile();

    service = module.get<NewsService>(NewsService);
  
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should save a new', async () => {
    expect(await service.createNew({title: "title 13", content: "content 3", image: "testimage"})).toBe(true);
  });

  it('should return false saving a bad data new', async () => {
    expect(await service.createNew({title: "title 13", content: null, image: "testimage"})).toBe(false);
  });

  it('should return the new with id 1', async () => {
    expect(await service.getNewById(1)).toStrictEqual({ id: 1, title: "title 1", content: "Body of the new with title 1", image: 'https://www.pinterest.com/ab45e877af777c896d86' });
  });

  it('should return null for a non existing id', async () => {
    expect(await service.getNewById(-1)).toBe(null);
  });

  it('should return true deleting an exisiting new', async () => {
    expect(await service.deleteNew(1)).toBe(true);
  });


});
