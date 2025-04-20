import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity({ name: 'admin_table' })
export class Adminstrator {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ nullable: true, name: 'office_number' })
  officeNumber: string;

  @Column({ nullable: true, name: 'role_title' })
  roleTitle: string;

  @Column({ nullable: true, name: 'email' })
  contactEmail: string;
  
}
