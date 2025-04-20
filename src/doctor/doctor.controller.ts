import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { UpdateAvailabilitySlotDto } from './dto/update-availability-slot.dto';
import { Doctor } from './entities/doctor.entity';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(createDoctorDto);
  }

  @Get('get-by-name')
  getDoctorByName(
    @Query('firstName') firstName: string,
    @Query('lastName') lastName: string,
  ): Promise<Partial<Doctor>[]> {
    return this.doctorService.getDoctorByName(firstName, lastName);
  }

  @Get()
  findAll() {
    return this.doctorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(+id, updateDoctorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorService.remove(+id);
  }

  @Get(':id/slots')
  getSlots(
    @Param('id') id: string,
  ) {
    return this.doctorService.getAvailableSlots(id);
  }

  @Put(':id/slots')
  updateSlots(
    @Param('id') id: string,
    @Body() updateAvailabilitySlotDto: UpdateAvailabilitySlotDto,
  ) {
    return this.doctorService.updateSlots(id, updateAvailabilitySlotDto);
  }
}
