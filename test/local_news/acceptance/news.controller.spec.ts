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

  it('should response 200 on GET /news', () => {
    return request(app.getHttpServer())
      .get('/news')
      .set('Authorization', `Bearer ${jwt}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });

  it('should response 400 on GET an non exisiting new id', () => {
    return request(app.getHttpServer())
      .get('/news/0')
      .set('Authorization', `Bearer ${jwt}`)
      .then((response) => {
        expect(response.statusCode).toBe(404);
      });
  });

  it('should response 400 on POST /news/ bad data', () => {
    return request(app.getHttpServer())
      .post('/news')
      .set('Authorization', `Bearer ${jwt}`)
      .send({title: "title 1", content: 3, image: "https://www.pinterest/a23db4455c456dee45c"})
      .then((response) => {
        expect(response.statusCode).toBe(400);
      });
  });
});
