import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import {
  IsString,
  IsInt,
  IsOptional,
  IsEmail,
  Min,
  Max,
  Length,
} from 'class-validator';
import { User } from 'src/user/entities/user.entity';

@Entity({ name: 'patient' })
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @IsString()
  @Length(1, 100)
  firstName: string;

  @IsString()
  @Length(1, 100)
  lastName: string;

  @IsString()
  gender: string;

  @IsInt()
  @Min(0)
  @Max(150)
  age: number;

  @IsString()
  @Length(10, 15)
  phone: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
