import { Type } from 'class-transformer';
import { IsEmail, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class CreatePatientDto {

  @IsString()
  firstName: string;
  
  @IsString()
  lastName: string;

  @IsString()
  gender: string;

  @IsNumber()
  age: number;;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto;


  
}
