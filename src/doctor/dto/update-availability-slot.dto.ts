import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { AvailabilitySlot } from '../entities/availability-slot.entity';

export class UpdateAvailabilitySlotDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AvailabilitySlot)
  availability: AvailabilitySlot[];
}
