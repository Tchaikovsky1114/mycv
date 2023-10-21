import { Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {

  @IsEmail()
  readonly email: string;

  @IsString()
  @Expose()
  readonly password: string;
}