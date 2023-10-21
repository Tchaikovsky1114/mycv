
import { IsString, IsNumber, Min, Max, IsLongitude, IsLatitude } from 'class-validator';
import { getYears } from 'src/common/getYears';

export class CreateReportDto {
  
  @IsString({message:'제조사는 스트링타입이어야 합니다.'})
  make: string;
  
  @IsString()
  model:string;

  @IsNumber()
  @Min(getYears(-30))
  @Max(getYears())
  year: number;
  
  @IsNumber()
  @Min(0)
  kilometer: number;
  
  @IsLongitude()
  lng: number;
  
  @IsLatitude()
  lat: number;
  
  @IsNumber()
  @Min(100000)
  @Max(100000000000)
  price: number;
}