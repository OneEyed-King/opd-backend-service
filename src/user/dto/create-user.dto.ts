import { IsEmail, IsEnum, IsString } from "class-validator";
import { UserRole } from "../entities/user.entity";

export class CreateUserDto {
    @IsString()
    name: string;
  
    @IsEmail()
    email: string;
  
    @IsString()
    phone: string;
  
    @IsString()
    password: string;
  
    @IsEnum(UserRole)
    role: UserRole;
}
