import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentService } from './appointment.service';
import { Logger } from '@nestjs/common';


describe('AppointmentService', () => {
  let service: AppointmentService;
  const logger = new Logger(AppointmentService.name)

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppointmentService],
    }).compile();

    service = module.get<AppointmentService>(AppointmentService);
  });

  it('should be defined', () => {
    logger.log('service defined')
    expect(service).toBeDefined();
  });
});
