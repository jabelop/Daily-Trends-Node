import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../src/app.module';


describe('NewsController', () => {
  let app: INestApplication;
  let jwt: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    let response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({username: "test1", password: "test1Password"});
      jwt = ((response.get("Set-Cookie")[0]).split(";")[0].split("=")[1]);
    
  });

  it('should response 200 on GET /scraped-news/mundo', () => {
    return request(app.getHttpServer())
      .get('/scraped-news/mundo')
      .set('Authorization', `Bearer ${jwt}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });
});
