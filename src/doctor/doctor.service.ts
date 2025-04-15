import { Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { Repository } from 'typeorm';
import { User, UserRole } from 'src/user/entities/user.entity';
import { promises } from 'dns';

@Injectable()
export class DoctorService {

  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepo: Repository<Doctor>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const { user: userData, ...doctorData } = createDoctorDto;

    // Step 1: Create & save user
    const user = this.userRepo.create({
      ...userData,
      role: UserRole.DOCTOR, // Ensure correct role
      oryId: 'someid'
    });
    const savedUser = await this.userRepo.save(user);

    // Step 2: Create doctor linked to user
    const doctor = this.doctorRepo.create({
      ...doctorData,
      user: savedUser,
    });
    return await this.doctorRepo.save(doctor);
  }


  findAll() {
    return `This action returns all doctor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} doctor`;
  }

  update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return `This action updates a #${id} doctor`;
  }

  remove(id: number) {
    return `This action removes a #${id} doctor`;
  }
}
