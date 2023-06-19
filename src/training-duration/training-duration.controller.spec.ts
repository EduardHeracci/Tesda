import { Test, TestingModule } from '@nestjs/testing';
import { TrainingDurationController } from './training-duration.controller';
import { TrainingDurationService } from './training-duration.service';

describe('TrainingDurationController', () => {
  let controller: TrainingDurationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrainingDurationController],
      providers: [TrainingDurationService],
    }).compile();

    controller = module.get<TrainingDurationController>(TrainingDurationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
