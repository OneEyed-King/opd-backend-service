import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Patient, User])], // 👈 Required for injecting repository
  controllers: [PatientController],
  providers: [PatientService],
  exports: [TypeOrmModule], // 👈 Optional: only if other modules need the repo too
})
export class PatientModule {}
