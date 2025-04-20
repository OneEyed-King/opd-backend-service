import { Module } from '@nestjs/common';
import { AdminstratorService } from './adminstrator.service';
import { AdminstratorController } from './adminstrator.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adminstrator } from './entities/adminstrator.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Adminstrator, User]), AdminstratorModule],
  controllers: [AdminstratorController],
  providers: [AdminstratorService],
})
export class AdminstratorModule {}
