import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { StateModule } from './state/state.module';

@Module({
  imports: [UsersModule, AuthModule,ConfigModule.forRoot(), StateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
