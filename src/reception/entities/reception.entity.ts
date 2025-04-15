import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity({ name: 'receptionist_table' })
export class Reception { @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;
  
    @Column()
    fullName: string;
  
    @Column({ nullable: true })
    phone: string;
  
    @Column({ nullable: true })
    deskNumber: string;
  
    @Column({ nullable: true })
    shift: string;
  }
