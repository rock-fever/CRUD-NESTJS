import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv'
dotenv.config()

async function bootstrap() {
  if(!admin.apps.length){
    admin.initializeApp({
      credential:admin.credential.cert({
        clientEmail: process.env.client_email,
        privateKey: process.env.private_key.replace(/\\n/g, '\n'),
        projectId: process.env.project_id
      }),
      databaseURL: 'https://booksyourbrain-5b1e4.firebaseio.com'
    })
  }
  
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
