import { Test, TestingModule } from '@nestjs/testing';
import { AdminstratorService } from './adminstrator.service';
import { Logger } from '@nestjs/common';


describe('AdminstratorService', () => {
  let service: AdminstratorService;
  const logger = new Logger(AdminstratorService.name)

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminstratorService],
    }).compile();

    service = module.get<AdminstratorService>(AdminstratorService);
  });

  it('should be defined', () => {
    logger.log('service defined')
    expect(service).toBeDefined();
  });
});
