import axios from "axios";
import { CheerioConfig } from "../../config/scraper";
import { ScrapedNewsRepository } from "../domain/ScrapedNewsRepository";
import { load } from "cheerio";
import { New } from "../domain/New";

export class ScrapedNewsCheerioRepository implements ScrapedNewsRepository{
    constructor() {}

    async getNews(config: CheerioConfig): Promise<New[]> {
        const pageContent = await axios.get(config.url);
            const $ = load(pageContent.data);
            
            const titles: string[] = [];
            $(config.titleSelector).each((_, element) => {
                titles.push((<string>$(element).text()));
            });
            const contents:string[] = [];
            $(config.contentSelector).each((_, element) => {
                contents.push($(element).text())
            });
            const images:string[] = [];
            $(config.imageSelector).each((_, element) => {
                images.push($(element).text())
            });
           
            return this.getNewsArray({titles,contents, images});
    }

    /**
     * get the news data as an array of New objects
     * 
     * @param newsData the news data
     * 
     * @returns the news data as an array of New objects
     */
    private getNewsArray(newsData: {titles;contents;images;}): New[] {
        const news: New[] = [];
        
        for(let index = 0; index < 4; index++) {
            let title: string | undefined = newsData.titles[index];
            if (title) {
                let scrapedMew: New = {title:"", content: "", image:""};
                scrapedMew.title = title;
                let content: string | undefined = newsData.contents[index];
                if (content) scrapedMew.content = content;
                let image: string | undefined = newsData.images[index];
                if (image) scrapedMew.image = image;
                news.push(scrapedMew);
            }
        }
        return news;
    }


}