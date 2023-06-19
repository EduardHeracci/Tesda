import { Test, TestingModule } from '@nestjs/testing';
import { UnitCompetencyService } from './unit-competency.service';

describe('UnitCompetencyService', () => {
  let service: UnitCompetencyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnitCompetencyService],
    }).compile();

    service = module.get<UnitCompetencyService>(UnitCompetencyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
