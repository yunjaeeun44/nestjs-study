import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //데코레이터가 없는 속성은 제외한다
      forbidNonWhitelisted: true, //데코레이터가 없는 속성이 들어온 경우 요청 자체를 막는다.
      transform: true, //자동 형변환
    })
  );
  await app.listen(3000);
}
bootstrap();
