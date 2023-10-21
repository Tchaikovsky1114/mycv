import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from '../users/user.entity'
@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private repo:Repository<Report>
    ) {}

  create(body:CreateReportDto,user: User) {
    const report = this.repo.create(body);
    report.user = user;
    console.log(report); 
    return this.repo.save(report);
  }
}
