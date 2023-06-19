import { Test, TestingModule } from '@nestjs/testing';
import { TrainingDurationService } from './training-duration.service';

describe('TrainingDurationService', () => {
  let service: TrainingDurationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrainingDurationService],
    }).compile();

    service = module.get<TrainingDurationService>(TrainingDurationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
