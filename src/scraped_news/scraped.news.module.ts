
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/infraestructure/strategies/jwt-strategy';
import { ScrapedNewsController } from './infrastructure/scraped.news.controller';
import { ScrapedNewsService } from './application/scraped.news.service';
import { ScrapedNewsRepository } from './domain/ScrapedNewsRepository';
import { ScrapedNewsCheerioRepository } from './infrastructure/ScrapedNewsCheerioRepository';

const scrapedNewRepositoryProvider = {provide: ScrapedNewsRepository, useClass: ScrapedNewsCheerioRepository};

@Module({
    imports: [

    ],
    controllers: [ScrapedNewsController],
    providers: [
        ScrapedNewsService,
        scrapedNewRepositoryProvider,
        JwtStrategy,
        JwtService
    ],
})
export class ScrapedNewsModule { }
