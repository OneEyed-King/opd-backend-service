import { Injectable } from '@nestjs/common';
import { CreateAdminstratorDto } from './dto/create-adminstrator.dto';
import { UpdateAdminstratorDto } from './dto/update-adminstrator.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Adminstrator } from './entities/adminstrator.entity';
import { Repository } from 'typeorm';
import { User, UserRole } from 'src/user/entities/user.entity';

@Injectable()
export class AdminstratorService {
  constructor(
    @InjectRepository(Adminstrator)
    private adminRaepository: Repository<Adminstrator>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createAdminstratorDto: CreateAdminstratorDto,): Promise<Adminstrator> {
    const { user:userData, ...administratorData } = createAdminstratorDto;

    const newUser = this.userRepository.create({
      ...userData,
      role: UserRole.ADMIN,
      oryId: 'someid'
    });
    const savedUser = await this.userRepository.save(newUser);

    const admin = this.adminRaepository.create({
      ...administratorData,
      user: savedUser,
    });

    return await this.adminRaepository.save(admin);
  }

  findAll() {
    return `This action returns all adminstrator`;
  }

  findOne(id: number) {
    return `This action returns a #${id} adminstrator`;
  }

  update(id: number, updateAdminstratorDto: UpdateAdminstratorDto) {
    return `This action updates a #${id} adminstrator`;
  }

  remove(id: number) {
    return `This action removes a #${id} adminstrator`;
  }
}
