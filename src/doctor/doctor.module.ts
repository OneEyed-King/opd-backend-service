import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { Doctor } from './entities/doctor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { AvailabilitySlot } from './entities/availability-slot.entity';
import { AppointmentModule } from 'src/appointment/appointment.module';
import { AppointmentSlot } from 'src/appointment/entities/appointment-slot.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Doctor, User, AvailabilitySlot, AppointmentSlot]),
    AppointmentModule,
  ],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}
