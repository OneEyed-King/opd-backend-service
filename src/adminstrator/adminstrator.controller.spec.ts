import { Test, TestingModule } from '@nestjs/testing';
import { AdminstratorController } from './adminstrator.controller';
import { AdminstratorService } from './adminstrator.service';
import { Logger } from '@nestjs/common';


describe('AdminstratorController', () => {
  let controller: AdminstratorController;
  const logger = new Logger(AdminstratorController.name)

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminstratorController],
      providers: [AdminstratorService],
    }).compile();

    controller = module.get<AdminstratorController>(AdminstratorController);
  });

  it('should be defined', () => {
    logger.log('controller defined')
    expect(controller).toBeDefined();
  });
});
