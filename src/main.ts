import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(8000); // 이걸로 접속 <- 
}
bootstrap();


// 1. 앱.모듈 파일 env 이름 확인
// 2. 해당 env 파일 생성 
//    MONGO="mongodb+srv://아이디:<패스워드입력ㄱㄱㄱ>@nestcluster.cngty4r.mongodb.net/"
//    MODE="dev"


