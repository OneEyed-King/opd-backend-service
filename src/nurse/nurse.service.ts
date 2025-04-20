import { Injectable } from '@nestjs/common';
import { CreateNurseDto } from './dto/create-nurse.dto';
import { UpdateNurseDto } from './dto/update-nurse.dto';
import { Nurse } from './entities/nurse.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from 'src/user/entities/user.entity';

@Injectable()
export class NurseService {
  constructor(
    @InjectRepository(Nurse)
    private nurseRepository: Repository<Nurse>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createNurseDto: CreateNurseDto): Promise<Nurse> {
    const { user: userData, ...nurseData } = createNurseDto;

    const newUser = this.userRepository.create({
      ...userData,
      role: UserRole.NURSE,
      oryId: 'someId'


    });
    const savedUser = await this.userRepository.save(newUser);

    const nurse = this.nurseRepository.create({
      ...nurseData,
      user: savedUser,
    });

    return await this.nurseRepository.save(nurse);
  }

  findAll() {
    return `This action returns all nurse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nurse`;
  }

  update(id: number, updateNurseDto: UpdateNurseDto) {
    return `This action updates a #${id} nurse`;
  }

  remove(id: number) {
    return `This action removes a #${id} nurse`;
  }
}
