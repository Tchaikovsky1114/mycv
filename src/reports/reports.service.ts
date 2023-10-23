import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from '../users/user.entity'
import { UpdateApprovedReportDto } from './dtos/update-approved-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private repo:Repository<Report>) {}

  createEstimate({ make, model, lng, lat, year, kilometer }: GetEstimateDto) {
    return this.repo
    .createQueryBuilder()
    .select('AVG(price)', 'price')
    .where('make = :make', { make })
    .andWhere('model = :model', { model })
    .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
    .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
    .andWhere('year - :year BETWEEN -3 AND 3', { year })
    .andWhere('approved IS TRUE')
    .orderBy('ABS(kilometer - :kilometer)', 'DESC')
    .setParameters({ kilometer })
    .limit(3)
    .getRawOne();
  }

  create(body:CreateReportDto,user: User) {
    const report = this.repo.create(body);
    report.user = user;
    return this.repo.save(report);
  }
  
  async findOne(id:number) {
    return await this.repo.findOne({
      where: { id }})
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
