import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { Doctor } from './entities/doctor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor, User])],
  exports: [TypeOrmModule], // 👈 Needed so other modules can import User
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}
