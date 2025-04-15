import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Doctor } from './doctor.entity';

@Entity()
export class AvailabilitySlot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @Column({
    type: 'enum',
    enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    nullable: true,
  })
  day?: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';


  @ManyToOne(() => Doctor, (doctor) => doctor.availability)
  doctor: Doctor;
}
