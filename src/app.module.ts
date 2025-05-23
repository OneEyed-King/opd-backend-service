import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientModule } from './patient/patient.module';
import { DoctorModule } from './doctor/doctor.module';
import { AppointmentModule } from './appointment/appointment.module';
import { ConsultationModule } from './consultation/consultation.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './appointment/entities/appointment.entity';
import { Patient } from './patient/entities/patient.entity';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { Doctor } from './doctor/entities/doctor.entity';
import { AvailabilitySlot } from './doctor/entities/availability-slot.entity';
import { AppointmentSlot } from './appointment/entities/appointment-slot.entity';
import { NurseModule } from './nurse/nurse.module';
import { ReceptionModule } from './reception/reception.module';
import { AdminstratorModule } from './adminstrator/adminstrator.module';
import { Nurse } from './nurse/entities/nurse.entity';
import { Adminstrator } from './adminstrator/entities/adminstrator.entity';
import { Reception } from './reception/entities/reception.entity';

@Module({
  imports: [
    PatientModule,
    DoctorModule,
    ConsultationModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'opd',
      entities: [
        Appointment,
        Patient,
        User,
        Doctor,
        AvailabilitySlot,
        AppointmentSlot,
        Nurse,
        Adminstrator,
        Reception,
      ],
      synchronize: true, // ✅ Auto-create tables (use only in dev!)
    }),
    AppointmentModule,
    UserModule,
    NurseModule,
    ReceptionModule,
    AdminstratorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
