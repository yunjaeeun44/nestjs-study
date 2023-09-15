import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes( //실제 환경과 동일하게 설정
      new ValidationPipe({
        whitelist: true, //데코레이터가 없는 속성은 제외한다
        forbidNonWhitelisted: true, //데코레이터가 없는 속성이 들어온 경우 요청 자체를 막는다.
        transform: true, //자동 형변환
      })
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('welcome to my Movie API');
  });

  describe("/movies", () =>{
    it("(GET) 200", () =>{
      return request(app.getHttpServer())
        .get("/movies")
        .expect(200)
        .expect([]);
    });
    it("(POST) 201", () => {
      return request(app.getHttpServer())
        .post("/movies")
        .send({
          title:"Test Movie",
          genres: ['test'],
          year: 2000,
        })
        .expect(201);
    });
    it("(POST) 400", () => {
      return request(app.getHttpServer())
        .post("/movies")
        .send({
          title:"Test Movie",
          genres: ['test'],
          year: 2000,
          other: "thing"
        })
        .expect(400);
    });
    it("(DELETE) 404", () =>{
      return request(app.getHttpServer())
        .delete("/movies")
        .expect(404);
    })
  });

  describe("/movies/:id", () =>{
    it('(GET) 200', () =>{
      return request(app.getHttpServer())
        .get("/movies/1")
        .expect(200);
    });
    it("(GET) 400", () => {
      return request(app.getHttpServer())
        .get("/movies/999")
        .expect(404);
    });
    it("(PATCH) 200", () => {
      return request(app.getHttpServer())
      .patch("/movies/1")
      .send({title: 'Updated Test'})
      .expect(200);
    });
    it("(DELETE) 200", () => {
      return request(app.getHttpServer())
      .delete("/movies/1")
      .expect(200);
    });
  });
});
