
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NewRepository } from '../domain/NewRepository';
import { New } from '../domain/New';

@Injectable()
export class NewsService {
  constructor(
    @Inject(NewRepository) private readonly newRepository: NewRepository,
    private readonly jwtService: JwtService
  ) { }

  async createNew(localNew: New): Promise<boolean> {
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
