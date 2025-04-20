import { BadRequestException, Injectable, Post } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment, AppointmentStatus } from './entities/appointment.entity';
import { User, UserRole } from 'src/user/entities/user.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { AppointmentSlot } from './entities/appointment-slot.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepo: Repository<Appointment>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Patient)
    private patientRepo: Repository<Patient>,
    @InjectRepository(AppointmentSlot)
    private appointmentSlotRepo: Repository<AppointmentSlot>,
    
  ) {}

  @Post()
  async create(body: CreateAppointmentDto): Promise<Appointment> {
    const { patient, doctorId, appointmentDate, reason, slotId } = body;

    let patientId: string;

    if (patient.existingPatientId) {
      patientId = patient.existingPatientId;
    } else if (patient.newPatientData) {
      const newUser = this.userRepository.create({
        oryId: 'someid',
        email: patient.newPatientData.email ?? '',
        password: 'dummy',
        role: UserRole.PATIENT,
      });
      const savedUser = await this.userRepository.save(newUser);

      const newPatient = this.patientRepo.create({
        ...patient.newPatientData,
        user: savedUser,
      });

      const savedPatient = await this.patientRepo.save(newPatient);
      patientId = savedPatient.id;
    } else {
      throw new BadRequestException('Patient data is missing');
    }

    const appointment = this.appointmentRepo.create({
      patientId,
      doctorId,
      appointmentDate: new Date(appointmentDate),
      reason,
      status: AppointmentStatus.PENDING,
    });

    const savedAppt = await  this.appointmentRepo.save(appointment);
    if(savedAppt){
       // 2. Check if slot is valid and not already booked
      const slot = await this.appointmentSlotRepo.findOne({ where: { id: slotId }, relations: ['appointment'] });
      if (!slot) {
        throw new Error('Slot not found');
      }
    
      // Assign appointment to slot
      slot.appointment = savedAppt;
      slot.isBooked = true;
      await this.appointmentSlotRepo.save(slot);
    }
    return savedAppt;
  }

  findAll() {
    return `This action returns all appointment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
