import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { NewRepository } from '../../../src/local_news/domain/NewRepository';
import { New } from '../../../src/local_news/domain/New';

@Injectable()
export class NewRepositoryTest implements NewRepository {
    news: New[] = [
        { id: 1, title: "title 1", content: "Body of the new with title 1", image: 'https://www.pinterest.com/ab45e877af777c896d86' }, 
        { id: 2, title: "title 2", content: "Body of the new with title 2", image: 'https://www.pinterest.com/ab45b8a7af777c896d86' },
    ]
    constructor() { }

    async saveNew(localNew: New): Promise<boolean> {
        if (!localNew.content) return false;
        if (localNew.title.length > 1 && 
            localNew.title.length < 120 && 
            (!localNew.image || localNew.image.length < 250))
            return true;
        return false;
    }

    async getNew(id: number): Promise<New | null> {
        return this.news.find((localNew) => localNew.id === id) || null;
    }

    async getAllNews(): Promise<New[]> {
        return this.news;
    }

    async deleteNew(id: number): Promise<boolean> {
        return true;
    }

}