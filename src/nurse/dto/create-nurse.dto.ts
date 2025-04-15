import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class CreateNurseDto {
    @IsString()
    fullName: string;
  
    @IsOptional()
    @IsString()
    phone?: string;
  
    @IsOptional()
    @IsString()
    shift?: string;
  
    @ValidateNested()
    @Type(() => CreateUserDto)
    user: CreateUserDto;
}
