import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { ReportsService } from './reports/reports.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, UsersService, ReportsService],
})
export class AppModule {}
