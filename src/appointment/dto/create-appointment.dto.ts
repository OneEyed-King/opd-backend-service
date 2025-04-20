import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUUID,
  IsDateString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class NewPatientDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  age: number;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  email?: string;
}

class PatientInputDto {
  @IsOptional()
  @IsUUID()
  existingPatientId?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => NewPatientDto)
  newPatientData?: NewPatientDto;
}

export class CreateAppointmentDto {
  @ValidateNested()
  @Type(() => PatientInputDto)
  patient: PatientInputDto;

  @IsUUID()
  doctorId: string;

  @IsUUID()
  @IsNotEmpty()
  slotId: string;

  @IsDateString()
  appointmentDate: string;

  @IsString()
  @IsNotEmpty()
  reason: string;
}
