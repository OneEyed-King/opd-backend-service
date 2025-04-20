import { Test, TestingModule } from '@nestjs/testing';
import { AdminstratorService } from './adminstrator.service';

describe('AdminstratorService', () => {
  let service: AdminstratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminstratorService],
    }).compile();

    service = module.get<AdminstratorService>(AdminstratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
