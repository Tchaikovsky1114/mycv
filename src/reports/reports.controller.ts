import { GetEstimateDto } from './dtos/get-estimate.dto';
import { Controller, Post, Get,Query, Body, UseGuards, Patch, Param, ParseIntPipe} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator'
import { User } from '../users/user.entity';
import { ReportDto } from './dtos/report.dto';
import { Serialize } from '../decorators/serialize.decorator';
import { UpdateApprovedReportDto } from './dtos/update-approved-report.dto';
import { AdminGuard } from '../guards/admin.guard';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService){}

  @Get()
  getEstimate(@Query() query: GetEstimateDto) {
    return this.reportsService.createEstimate(query);
  }

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user)
  }

  
  @Patch('approve/:id')
  @UseGuards(AdminGuard)
  updateApprovedReport(@Param('id',ParseIntPipe) id:number, @Body() body:UpdateApprovedReportDto){
    return this.reportsService.updateApproved(id,body)
  }


}
