import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class CreateAdminstratorDto {
    @IsString()
    fullName: string;
  
    @IsOptional()
    @IsString()
    phone?: string;
  
    @ValidateNested()
    @Type(() => CreateUserDto)
    user: CreateUserDto;
}
