import { Test, TestingModule } from '@nestjs/testing';
import { LearnersInfoService } from './learners-info.service';

describe('LearnersInfoService', () => {
  let service: LearnersInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LearnersInfoService],
    }).compile();

    service = module.get<LearnersInfoService>(LearnersInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
