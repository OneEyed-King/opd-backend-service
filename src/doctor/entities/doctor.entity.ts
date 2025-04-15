import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { AvailabilitySlot } from './availability-slot.entity';
import { User } from 'src/user/entities/user.entity';

@Entity({ name: 'practitioner_table' })
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  fullName: string;

  @Column({ nullable: true })
  qualification: string;

  @Column({ nullable: true })
  specialization: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  address: string;

  @OneToMany(() => AvailabilitySlot, (availabilitySlot) => availabilitySlot.doctor)
  availability: AvailabilitySlot[];
}
