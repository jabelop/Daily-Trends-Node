import { Test, TestingModule } from '@nestjs/testing';

import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../../../src/auth/application/auth.service';
import { UserRepository } from '../../../src/auth/domain/UserRepository';
import { UserTypeOrm } from '../../../src/auth/infraestructure/UserTypeOrm';
import { UserRepositoryTest } from './userRespositoryTest';

const usersRepositoryProvider = {provide: UserRepository, useClass: UserRepositoryTest};

describe('AuthService', () => {
  let service: AuthService;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [usersRepositoryProvider, JwtService, UserTypeOrm, AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should save an user', async () => {
    expect(await service.save({username: "test3", password: "test3Password"})).toBe(true);
  });

  it('should login an existing user', async () => {
    expect(await service.login({username: "test1", password: "test1Password"})).toBeTruthy();
  });
});
