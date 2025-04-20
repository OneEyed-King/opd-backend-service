import { Injectable } from '@nestjs/common';
import { CreateReceptionDto } from './dto/create-reception.dto';
import { UpdateReceptionDto } from './dto/update-reception.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reception } from './entities/reception.entity';
import { Repository } from 'typeorm';
import { User, UserRole } from 'src/user/entities/user.entity';

@Injectable()
export class ReceptionService {
  constructor(
    @InjectRepository(Reception)
    private receptionistRepository: Repository<Reception>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createReceptionDto: CreateReceptionDto): Promise<Reception> {
    const { user:userData, ...receptionintData } = createReceptionDto;

    const newUser = this.userRepository.create({
      ...userData,
      role: UserRole.RECEPTION,
      oryId: 'someid'
    });
    const savedUser = await this.userRepository.save(newUser);

    const receptionist = this.receptionistRepository.create({
      ...receptionintData,
      user: savedUser,
    });

    return await this.receptionistRepository.save(receptionist);
  }
  findAll() {
    return `This action returns all reception`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reception`;
  }

  update(id: number, updateReceptionDto: UpdateReceptionDto) {
    return `This action updates a #${id} reception`;
  }

  remove(id: number) {
    return `This action removes a #${id} reception`;
  }
}
