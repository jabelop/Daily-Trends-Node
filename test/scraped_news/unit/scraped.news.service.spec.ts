import { Test, TestingModule } from '@nestjs/testing';

import { JwtService } from '@nestjs/jwt';
import { ScrapedNewsRepository } from '../../../src/scraped_news/domain/ScrapedNewsRepository';
import { ScrapedNewsService } from '../../../src/scraped_news/application/scraped.news.service';
import { ScrapedNewsTestRepository } from './ScrapedNewsTestRepository';

const scrapedNewsRepositoryTest = { provide: ScrapedNewsRepository, useClass: ScrapedNewsTestRepository };

describe('AuthService', () => {
    let service: ScrapedNewsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [scrapedNewsRepositoryTest, JwtService, ScrapedNewsService],
        }).compile();

        service = module.get<ScrapedNewsService>(ScrapedNewsService);

    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it(`should get: 
      {
        title: "title1",
        content: "content1",
        image: "https://www.server.com/image1"
      },
      {
        title: "title2",
        content: "content2",
        image: "https://www.server.com/image2"
      }`, 
    async () => {
        expect(await service.getMundoNews()).toEqual(
            [
              {
                title: "title1",
                content: "content1",
                image: "https://www.server.com/image1"
              },
              {
                title: "title2",
                content: "content2",
                image: "https://www.server.com/image2"
              }
            ]
        );
    });

    it(`should get: 
      {
        title: "title1",
        content: "content1",
        image: "https://www.server.com/image1"
      },
      {
        title: "title2",
        content: "content2",
        image: "https://www.server.com/image2"
      }`, 
    async () => {
        expect(await service.getPaisNews()).toEqual(
            [
              {
                title: "title1",
                content: "content1",
                image: "https://www.server.com/image1"
              },
              {
                title: "title2",
                content: "content2",
                image: "https://www.server.com/image2"
              }
            ]
        );
    });
});
