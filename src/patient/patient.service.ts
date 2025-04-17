import { Body, Injectable, Post } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Repository } from 'typeorm';
import { User, UserRole } from 'src/user/entities/user.entity';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Patient)
    private readonly patientRepo: Repository<Patient>,
  ) {}

  @Post()
  async create(@Body() createPatientDto: CreatePatientDto): Promise<Patient> {
    // const patient = this.patientRepo.create(createPatientDto);
    const { user: userData, ...patientData } = createPatientDto;

    const newUser = this.userRepository.create({
      ...userData,
      role: UserRole.PATIENT,
      oryId: 'someid',
      email: patientData.email,
      password: 'somepass',
      isActive: false
      
    });
    const savedUser = await this.userRepository.save(newUser);

    const patient = this.patientRepo.create({
      ...patientData,
      user: savedUser,
    });

    return await this.patientRepo.save(patient);
  }

  findAll() {
    return this.patientRepo.find();
  }

  findOne(id: number) {
    return this.patientRepo.findOne({
      where: { id },
    });
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return this.patientRepo.update(id, updatePatientDto);
  }

  remove(id: number) {
    return this.patientRepo.delete(id);
  }
}
