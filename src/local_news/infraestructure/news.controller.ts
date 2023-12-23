import { BadRequestException, Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { NewsService } from '../application/news.service';
import { JwtAuthGuard } from '../../auth/infraestructure/strategies/jwt-auth.guard';
import { New } from '../domain/New';
import { NewValidator } from '../domain/NewValidator';
import { HTTPError } from '../../shared/domain/HTTPError';


@Controller('news')
export class NewsController {
    constructor(
        @Inject(NewsService) private readonly newsService: NewsService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAlNews(): Promise<New[]> {

        return this.newsService.getAllNews();

    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getNew(@Param('id') id: string): Promise<New> {

        const localNew: New = await this.newsService.getNewById(Number(id));
        if (!localNew) throw new HttpException('No new with that id', HttpStatus.NOT_FOUND);
        return localNew;
        
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createNew(@Body() localNew: New): Promise<New> {

        const result: HTTPError | boolean = await this.newsService.createNew(localNew);
        if (result === true) return;
        throw new HttpException((<HTTPError>result).getMessage(), (<HTTPError>result).getStatus());

    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async deleteNew(@Body() localNew: New): Promise<New> {

        if (await this.newsService.deleteNew(Number(localNew.id))) return;
    }

}
