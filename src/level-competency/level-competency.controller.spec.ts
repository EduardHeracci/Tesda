import { Test, TestingModule } from '@nestjs/testing';
import { LevelCompetencyController } from './level-competency.controller';
import { LevelCompetencyService } from './level-competency.service';

describe('LevelCompetencyController', () => {
  let controller: LevelCompetencyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LevelCompetencyController],
      providers: [LevelCompetencyService],
    }).compile();

    controller = module.get<LevelCompetencyController>(LevelCompetencyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
