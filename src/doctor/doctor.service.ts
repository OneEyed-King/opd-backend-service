import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { Repository } from 'typeorm';
import { User, UserRole } from 'src/user/entities/user.entity';
import { AvailabilitySlot } from './entities/availability-slot.entity';
import { AppointmentSlot } from 'src/appointment/entities/appointment-slot.entity';
import { addMinutes, format } from 'date-fns';
import { UpdateAvailabilitySlotDto } from './dto/update-availability-slot.dto';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepo: Repository<Doctor>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(AvailabilitySlot)
    private readonly availabilitySlotRepo: Repository<AvailabilitySlot>,
    @InjectRepository(AppointmentSlot)
    private readonly appointmentSlotRepo: Repository<AppointmentSlot>,
  ) {}

  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const { user: userData, availability, ...doctorData } = createDoctorDto;

    // Step 1: Create & save user
    const user = this.userRepo.create({
      ...userData,
      role: UserRole.DOCTOR, // Ensure correct role
      oryId: 'someid',
    });
    const savedUser = await this.userRepo.save(user);

    // Step 2: Create doctor linked to user
    const doctor = this.doctorRepo.create({
      ...doctorData,
      user: savedUser,
    });
    const savedDoctor = await this.doctorRepo.save(doctor);

    // Step 3: Link and save availability slots and generate appointment slots
    if (availability && availability.length > 0) {
      await this.updateAvailabilitySlots(savedDoctor, availability);
    }

    return savedDoctor;
  }

  private async generateAppointmentSlots(
    doctor: Doctor,
    availabilitySlots: AvailabilitySlot[],
  ) {
    const appointmentSlots: AppointmentSlot[] = [];

    for (const availabilitySlot of availabilitySlots) {
      const startTime = new Date(`1970-01-01T${availabilitySlot.startTime}`);
      const endTime = new Date(`1970-01-01T${availabilitySlot.endTime}`);

      let currentStartTime = startTime;

      while (currentStartTime < endTime) {
        const currentEndTime = addMinutes(currentStartTime, 20);

        if (currentEndTime <= endTime) {
          const appointmentSlot = this.appointmentSlotRepo.create({
            startTime: format(currentStartTime, 'HH:mm'),
            endTime: format(currentEndTime, 'HH:mm'),
            doctor,
            isBooked: false,
            dayOfWeek: availabilitySlot.day,
          });

          appointmentSlots.push(appointmentSlot);
        }
        currentStartTime = currentEndTime;
      }
    }

    await this.appointmentSlotRepo.save(appointmentSlots);
  }

  async updateSlots(
    doctorId: string,
    updateAvailabilitySlotDto: UpdateAvailabilitySlotDto,
  ): Promise<void> {
    const { availability } = updateAvailabilitySlotDto;
    const doctor = await this.doctorRepo.findOne({ where: { id: doctorId } });

    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${doctorId} not found`);
    }

    await this.updateAvailabilitySlots(doctor, availability);
  }

  private async updateAvailabilitySlots(
    doctor: Doctor,
    availability: AvailabilitySlot[],
  ) {
    // Remove existing availability slots for the doctor
    await this.availabilitySlotRepo.delete({ doctor });

    // Save new availability slots
    for (const slot of availability) {
      slot.doctor = doctor;
    }
    await this.availabilitySlotRepo.save(availability);

    // Regenerate appointment slots
    await this.generateAppointmentSlots(doctor, availability);
  }

  async getAvailableSlots(doctorId: string): Promise<AppointmentSlot[]> {
    return this.appointmentSlotRepo
      .createQueryBuilder('slot')
      .where('slot.doctor_id = :doctorId', { doctorId })
      .andWhere('slot.is_booked = :isBooked', { isBooked: false })
      .getMany();
  }

  getDoctorByName(
    firstName: string | null,
    lastName: string | null,
  ): Promise<Doctor[]> {
    const query = this.doctorRepo.createQueryBuilder('p');

    query.where(
      `(:firstName::text IS NULL OR LOWER(p.first_name) LIKE LOWER(:firstNameLike))`,
    );

    query.orWhere(
      `(:lastName::text IS NULL OR LOWER(p.last_name) LIKE LOWER(:lastNameLike))`,
    );

    return query
      .setParameters({
        firstName,
        firstNameLike: `%${firstName || ''}%`,
        lastName,
        lastNameLike: `%${lastName || ''}%`,
      })
      .getMany();
  }

  findAll() {
    return `This action returns all doctor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} doctor`;
  }

  update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return `This action updates a #${id} doctor`;
  }

  remove(id: number) {
    return `This action removes a #${id} doctor`;
  }
}
