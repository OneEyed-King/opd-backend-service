import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Doctor } from '../../doctor/entities/doctor.entity';
import { Appointment } from './appointment.entity';

@Entity()
export class AppointmentSlot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'time', name: 'start_time' })
  startTime: string;

  @Column({ type: 'time', name: 'end_time' })
  endTime: string;

  @Column({ type: 'timestamptz', nullable: true  })
  date: Date;

  @Column({ name: 'is_booked' })
  isBooked: boolean;

  @Column({ name: 'day_of_week' })
  dayOfWeek: string;

  @ManyToOne(() => Doctor, (doctor) => doctor.availability)
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;

  @ManyToOne(() => Appointment, (appointment) => appointment.appointmentSlots, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'appointment_id' })
  appointment: Appointment;
}
