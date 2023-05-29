import { CheerioConfig } from "../../config/scraper";

export interface ScrapedNewsRepository {
    /**
     * get the news from a web making scraping
     *  
     * @param config the object with the required parameters to scrape the web
     */
    getNews(config: CheerioConfig);
}

export const ScrapedNewsRepository = Symbol("ScrapedNewsRepository");