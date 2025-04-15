import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { UpdateAvailabilitySlotDto } from './dto/update-availability-slot.dto';


@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(createDoctorDto);
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

  @Put(':id/slots')
  updateSlots(@Param('id') id: string, @Body() updateAvailabilitySlotDto: UpdateAvailabilitySlotDto) {
    return this.doctorService.updateSlots(+id, updateAvailabilitySlotDto);
  }
}
