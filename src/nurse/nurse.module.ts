import { Module } from '@nestjs/common';
import { NurseService } from './nurse.service';
import { NurseController } from './nurse.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nurse } from './entities/nurse.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Nurse, User,]),
    NurseModule,
  ],
  controllers: [NurseController],
  providers: [NurseService],
})
export class NurseModule {}
