import { Test, TestingModule } from '@nestjs/testing';
import { LearningOutcomeController } from './learning-outcome.controller';
import { LearningOutcomeService } from './learning-outcome.service';

describe('LearningOutcomeController', () => {
  let controller: LearningOutcomeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LearningOutcomeController],
      providers: [LearningOutcomeService],
    }).compile();

    controller = module.get<LearningOutcomeController>(LearningOutcomeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
