import { BadRequestException, Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { NewsService } from '../application/news.service';
import { JwtAuthGuard } from '../../auth/infraestructure/strategies/jwt-auth.guard';
import { New } from '../domain/New';
import { NewValidator } from '../domain/NewValidator';


@Controller('news')
export class NewsController {
    constructor(
        @Inject(NewsService) private readonly newsService: NewsService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAlNews(): Promise<New[]> {
        try {
            return this.newsService.getAllNews();
        } catch (error) {
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getNew(@Param('id') id: string): Promise<New | null> {
        try {
            const localNew: New = await this.newsService.getNewById(Number(id));
            if (!localNew) throw new HttpException('No new with that id', HttpStatus.NOT_FOUND);
            return localNew;
        } catch (error) {
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createNew(@Body() localNew: New): Promise<New> {
        try {
            if (!(new NewValidator(localNew)).validate()) throw new HttpException('Bad request data', HttpStatus.NOT_FOUND);
            if (await this.newsService.createNew(localNew)) return;
            throw new HttpException('Internal error', HttpStatus.INTERNAL_SERVER_ERROR);
        } catch(error) {
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }   
    }

}
