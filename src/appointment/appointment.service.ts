import { BadRequestException, Injectable, Logger, Post } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment, AppointmentStatus } from './entities/appointment.entity';
import { User, UserRole } from 'src/user/entities/user.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { AppointmentSlot } from './entities/appointment-slot.entity';
import { AppointmentMapper } from './mapper/appointment-mapper';

@Injectable()
export class AppointmentService {
  private readonly logger = new Logger(AppointmentService.name);

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
    this.logger.log('Creating appointment');

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

    const savedAppt = await this.appointmentRepo.save(appointment);
    if (savedAppt) {
      // 2. Check if slot is valid and not already booked
      const slot = await this.appointmentSlotRepo.findOne({
        where: { id: slotId },
        relations: ['appointment'],
      });
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

  async findUpcomingByDoctorId(doctorId: string) {
    this.logger.log('Finding all appointments with patient data by doctor id');

    try {
      const appointments = await this.appointmentRepo
        .createQueryBuilder('a')
        .innerJoin('patient', 'p', 'a.patient_id::uuid = p.id')
        .where('a.doctor_id = :doctorId', { doctorId })
        .andWhere('a.appointment_date > CURRENT_TIMESTAMP')
        .select([
          'a.id',
          'a.appointment_date',
          'a.reason',
          'a.doctor_id',
          'a.patient_id',
          'a.status',
          'p.id',
          'p.first_name',
          'p.last_name',
        ])
        .getRawMany();
      console.log('appointment data ',appointments)
      // Mapping the raw result to the DTO using the AppointmentMapper
      return appointments.map(AppointmentMapper.toAppointmentWithPatientDto);
    } catch (error) {
      // Log the error
      this.logger.error('Error occurred while fetching appointments', error);

      // Handle the error (e.g., throw custom exception, or return empty array, etc.)
      throw new Error('Failed to fetch appointments');
    }
  }

  findAll() {
    this.logger.log('Finding all appointments');

    return `This action returns all appointment`;
  }

  findOne(id: number) {
    this.logger.log('Finding one appointment');

    return `This action returns a #${id} appointment`;
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    this.logger.log('Updating appointment');

    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    this.logger.log('Removing appointment');

    return `This action removes a #${id} appointment`;
  }
}
