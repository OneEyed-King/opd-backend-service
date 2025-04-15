import { Entity, Column, PrimaryGeneratedColumn, Timestamp, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { AppointmentSlot } from './appointment-slot.entity';


export enum AppointmentStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

@Entity({ name: 'appointment' })
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patientId: number;

  @Column()
  doctorId: number;

  @Column({
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus.PENDING,
  })
  status: AppointmentStatus;

  @Column({ type: 'timestamp' })
  appointmentDate: Date;

  @Column()
  reason: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => AppointmentSlot, (appointmentSlot) => appointmentSlot.appointment)
  appointmentSlots: AppointmentSlot[];
}
