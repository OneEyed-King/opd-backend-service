import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';


@Entity({ name: 'nurse_table' })
export class Nurse {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  fullName: string;

  @Column({ nullable: true })
  department: string;

  @Column({ nullable: true })
  shift: string;

  @Column({ nullable: true })
  phone: string;
}