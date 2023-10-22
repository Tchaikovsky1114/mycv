import { IsBoolean, IsNotEmpty } from "class-validator";


export class UpdateApprovedReportDto {
  
  @IsBoolean()
  @IsNotEmpty()
  approved: boolean;
}