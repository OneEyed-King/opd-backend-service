import { Test, TestingModule } from '@nestjs/testing';
import { AdminstratorController } from './adminstrator.controller';
import { AdminstratorService } from './adminstrator.service';

describe('AdminstratorController', () => {
  let controller: AdminstratorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminstratorController],
      providers: [AdminstratorService],
    }).compile();

    controller = module.get<AdminstratorController>(AdminstratorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
