import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Doctor } from '../../doctor/entities/doctor.entity';
import { Appointment } from './appointment.entity';

@Entity()
export class AppointmentSlot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'time' })
  startTime: string;

  @Column({ type: 'time' })
  endTime: string;

  @Column({ type: 'timestamptz' })
  date: Date;


  @ManyToOne(() => Doctor, (doctor) => doctor.availability)
  doctor: Doctor;

  @ManyToOne(() => Appointment, (appointment) => appointment.appointmentSlots, {
    onDelete: 'CASCADE',
  })
  appointment: Appointment;
}
