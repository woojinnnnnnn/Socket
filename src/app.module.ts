import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatsModule } from './chats/chats.module';
import * as Mongoose from 'mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO), // <- 여기에 광열님 몽고 디비 연결.
    ChatsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  configure() {
    const DEBUG = process.env.MODE === 'dev' ? true : false; // 여기는 'dev' 입력
    Mongoose.set('debug', DEBUG);
  }
}
