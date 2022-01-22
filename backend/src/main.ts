import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import 'dotenv/config'

async function bootstrap() {
  if(!admin.apps.length){
    admin.initializeApp({
      credential:admin.credential.cert({
        clientEmail: process.env.CLIENT_EMAIL,
        privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
        projectId: process.env.PROJECT_ID
      }),
      databaseURL: 'https://booksyourbrain-5b1e4.firebaseio.com'
    })
  }
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
