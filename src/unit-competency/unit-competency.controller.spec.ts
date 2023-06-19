import { Test, TestingModule } from '@nestjs/testing';
import { UnitCompetencyController } from './unit-competency.controller';
import { UnitCompetencyService } from './unit-competency.service';

describe('UnitCompetencyController', () => {
  let controller: UnitCompetencyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnitCompetencyController],
      providers: [UnitCompetencyService],
    }).compile();

    controller = module.get<UnitCompetencyController>(UnitCompetencyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
