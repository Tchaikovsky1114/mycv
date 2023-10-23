
import { Transform } from 'class-transformer';
import { IsString, IsNumber, Min, Max, IsLongitude, IsLatitude } from 'class-validator';
import { getYears } from 'src/common/getYears';


export class GetEstimateDto {
  
  @IsString({message:'제조사는 스트링타입이어야 합니다.'})
  make: string;
  
  @IsString()
  model:string;

  @IsNumber()
  @Min(getYears(-30))
  @Max(getYears())
  @Transform(({ value }) => parseInt(value))
  year: number;
  
  @IsNumber()
  @Min(0)
  @Transform(({value}) => parseInt(value))
  kilometer: number;
  
  @IsLongitude()
  @Transform(({value}) => parseFloat(value))
  lng: number;
  
  @IsLatitude()
  @Transform(({value}) => parseFloat(value))
  lat: number;
  
}