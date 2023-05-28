import { Test, TestingModule } from '@nestjs/testing';

import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../../../src/auth/application/auth.service';
import { UserRepository } from '../../../src/auth/domain/UserRepository';
import { UserTypeOrm } from '../../../src/auth/infraestructure/UserTypeOrm';
import { UserRepositoryMysql } from '../../../src/auth/infraestructure/UserRepositoryMysql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from '../../../src/config/db';
import { AuthModule } from '../../../src/auth/auth.module';

const usersRepositoryProvider = {provide: UserRepository, useClass: UserRepositoryMysql};

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: UserRepository;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(dbConfig), AuthModule],
      providers: [JwtService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should save an user', async () => {
    expect(await userRepository.saveUser({id: 0, username: "test13", password: "test1test13Password"})).toBe(true);
  });

  it('should login an existing user', async () => {
    expect(await userRepository.getUser("test13")).toBeTruthy();
    
  });

  afterAll(async () => await userRepository.deleteUser(0));
});
