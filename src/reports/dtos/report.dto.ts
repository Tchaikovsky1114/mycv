
import { Expose,Transform } from 'class-transformer';
import { User } from '../../users/user.entity';
export class ReportDto {
  @Expose()
  id: number;
  @Expose()
  price: number;
  @Expose()
  year:number;
  @Expose()
  lng: number;
  @Expose()
  lat: number;
  @Expose()
  make: string;
  @Expose()
  model: string;
  @Expose() 
  kilometer: number;

  // 기존 데이터를 변환하여 새로운 속성을 만들어 제공할 수 있다
  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}