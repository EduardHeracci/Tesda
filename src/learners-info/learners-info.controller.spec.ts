import { Test, TestingModule } from '@nestjs/testing';
import { LearnersInfoController } from './learners-info.controller';
import { LearnersInfoService } from './learners-info.service';

describe('LearnersInfoController', () => {
  let controller: LearnersInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LearnersInfoController],
      providers: [LearnersInfoService],
    }).compile();

    controller = module.get<LearnersInfoController>(LearnersInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
