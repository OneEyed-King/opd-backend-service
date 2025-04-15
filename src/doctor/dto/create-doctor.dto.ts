import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AvailabilitySlot } from '../entities/availability-slot.entity';

export class CreateDoctorDto {
  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto;

  @IsString()
  specialization: string;

  @IsString()
  qualification: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AvailabilitySlot)
  availability: AvailabilitySlot[];
}
