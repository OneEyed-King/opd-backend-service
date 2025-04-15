import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class CreateDoctorDto {
  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto;

  @IsString()
  specialization: string;

  @IsString()
  qualification: string;
}
