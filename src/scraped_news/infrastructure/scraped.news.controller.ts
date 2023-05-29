import { Controller, Get, HttpException, HttpStatus, Inject, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/infraestructure/strategies/jwt-auth.guard';
import { ScrapedNewsService } from '../application/scraped.news.service';


@Controller('scraped-news')
export class ScrapedNewsController {
    constructor(
        @Inject(ScrapedNewsService) private readonly scrapedNewsService: ScrapedNewsService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get('/mundo')
    async getScrapedMundoNews(): Promise<any> {
        try {
            return this.scrapedNewsService.getMundoNews();
        } catch (error) {
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('/pais')
    async getScrapedPaisNews(): Promise<any> {
        try {
            return this.scrapedNewsService.getPaisNews();
        } catch (error) {
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
