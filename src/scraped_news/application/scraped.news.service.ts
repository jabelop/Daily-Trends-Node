import { Inject, Injectable } from "@nestjs/common";
import { New } from "../domain/New";
import { NewsScraperConfig } from "../../config/scraper";
import { ScrapedNewsRepository } from "../domain/ScrapedNewsRepository";

@Injectable()
export class ScrapedNewsService {

    constructor(@Inject(ScrapedNewsRepository) private readonly repository: ScrapedNewsRepository) {}

    async getMundoNews(): Promise<New> {
        return this.repository.getNews(NewsScraperConfig.mundo);
    }

    async getPaisNews(): Promise<New> {
        return this.repository.getNews(NewsScraperConfig.pais);
    }
}