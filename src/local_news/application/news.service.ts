
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NewRepository } from '../domain/NewRepository';
import { New } from '../domain/New';
import { NewValidator } from '../domain/NewValidator';
import { BadRequestError } from '../../shared/domain/BadRequestError';
import { HTTPError } from '../../shared/domain/HTTPError';

@Injectable()
export class NewsService {
  constructor(
    @Inject(NewRepository) private readonly newRepository: NewRepository,
    private readonly jwtService: JwtService
  ) { }

  async createNew(localNew: New): Promise<HTTPError | boolean> {
    if (!(new NewValidator(localNew)).validate()) return new BadRequestError();
    return this.newRepository.saveNew(localNew);
  }

  async getNewById(id: number): Promise<New | null> {
    return this.newRepository.getNew(id);
  }

  async getAllNews(): Promise<New[] | null> {
    return this.newRepository.getAllNews();
  }

  async deleteNew(id: number): Promise<boolean> {
    return this.newRepository.deleteNew(id);
  }
}
