
import { Test, TestingModule } from "@nestjs/testing"
import { INestApplication } from "@nestjs/common";
import * as request from 'supertest';
import { AppModule } from "./../src/app.module"

describe('auth e2e', () => {
  let app:INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    
    await app.init();
  })

  it('POST /auth/signup', () => {
    const email = 'test@test.com'
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: 'mypassword'})
      .expect(201)
      .then(({ body }) => {
        // const { id, email } = body;
        // expect(id).toBeDefined();
        // expect(email).toEqual(email);
        console.log(body);
      })
    })
})