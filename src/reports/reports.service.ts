import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from '../users/user.entity'
import { UpdateApprovedReportDto } from './dtos/update-approved-report.dto';
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
  
  async findOne(id:number) {
    return await this.repo.findOne({
      where:{
      id
    }})
  }

  async updateApproved(id:number, body:UpdateApprovedReportDto) {
    const report = await this.findOne(id);
    if(!report) {
      throw new NotFoundException('레포트가 존재하지 않습니다.');
    }
    report.approved = body.approved; 
    return this.repo.save(report);
  }
}
