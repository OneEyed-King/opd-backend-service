import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepo: Repository<Patient>,
  ) {}

  create(createPatientDto: CreatePatientDto) {
    const patient = this.patientRepo.create(createPatientDto);
    return this.patientRepo.save(patient);
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
