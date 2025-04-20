import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Doctor } from './doctor.entity';

@Entity()
export class AvailabilitySlot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({name: 'start_time'})
  startTime: string;

  @Column({name: 'end_time'})
  endTime: string;

  @Column({
    type: 'enum',
    enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    nullable: true,
  })
  day?: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

  @ManyToOne(() => Doctor, (doctor) => doctor.availability)
  @JoinColumn({name: 'doctor_id'})
  doctor: Doctor;
}
