import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';
import {  TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
const cookieSession = require('cookie-session');

@Module({
  imports:[
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config:ConfigService) => {
        return {
          type: 'sqlite',
          database: config.get<string>('DB_NAME'),
          synchronize:true,
          entities: [User, Report]
        }
      }
    }),
  //   TypeOrmModule.forRoot({
  //   type: 'sqlite',
  //   database: 'db.sqlite',
  //   entities: [User,Report],
  //   synchronize: true, // TODO: disable this in production
  // }),
  ReportsModule,
  UsersModule
],  
  controllers: [AppController],
  providers: [AppService],
})

//const app = await NestFactory.create(AppModule);
// app.enableCors({ credentials: true, origin: true });

export class AppModule {
  constructor(
    private configService: ConfigService 
  ) {}
  configure(consumer:MiddlewareConsumer) {
    consumer.apply(
      cookieSession({ keys: this.configService.get('COOKIE_KEY') }),
    ).forRoutes('*');
  }
}
