import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatsModule } from './chats/chats.module';
import * as Mongoose from 'mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO),
    ChatsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  configure() {
    const DEBUG = process.env.MODE === 'dev' ? true : false;
    Mongoose.set('debug', DEBUG);
  }
}
