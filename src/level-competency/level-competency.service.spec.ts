import { Test, TestingModule } from '@nestjs/testing';
import { LevelCompetencyService } from './level-competency.service';

describe('LevelCompetencyService', () => {
  let service: LevelCompetencyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LevelCompetencyService],
    }).compile();

    service = module.get<LevelCompetencyService>(LevelCompetencyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
