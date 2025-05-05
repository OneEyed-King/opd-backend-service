import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, Query, Header } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}
  private readonly logger = new Logger(AppointmentController.name);


  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    this.logger.log('Creating appointment');
    return this.appointmentService.create(createAppointmentDto);
  }

  @Get('/upcoming-by-doctor')
  @Header('Cache-Control', 'no-cache, no-store, must-revalidate')
  findUpcomingByDoctorId(@Query('doctorId') doctorId: string) {
    this.logger.log('Finding one appointment');
    return this.appointmentService.findUpcomingByDoctorId(doctorId);
  }

  @Get()
  findAll() {
    this.logger.log('Finding all appointments');
    return this.appointmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.logger.log('Finding one appointment');
    return this.appointmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    this.logger.log('Updating appointment');
    return this.appointmentService.update(+id, updateAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.logger.log('Removing appointment');
    return this.appointmentService.remove(+id);
  }
}
