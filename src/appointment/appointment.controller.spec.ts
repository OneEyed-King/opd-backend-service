import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { Logger } from '@nestjs/common';


describe('AppointmentController', () => {
  let controller: AppointmentController;
  const logger = new Logger(AppointmentController.name)

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentController],
      providers: [AppointmentService],
    }).compile();

    controller = module.get<AppointmentController>(AppointmentController);
  });

  it('should be defined', () => {
    logger.log('controller defined')
    expect(controller).toBeDefined();
  });
});
