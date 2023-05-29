import { CheerioConfig } from "../../../src/config/scraper";
import { New } from "../../../src/scraped_news/domain/New";
import { ScrapedNewsRepository } from "../../../src/scraped_news/domain/ScrapedNewsRepository";

export class ScrapedNewsTestRepository implements ScrapedNewsRepository {

    getNews(config: CheerioConfig): New[] {
        return [
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
        ];
    }
    
}