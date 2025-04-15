import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity({ name: 'admin_table' })
export class Adminstrator {
    @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  fullName: string;

  @Column({ nullable: true })
  officeNumber: string;

  @Column({ nullable: true })
  roleTitle: string;

  @Column({ nullable: true })
  contactEmail: string;
  
}
