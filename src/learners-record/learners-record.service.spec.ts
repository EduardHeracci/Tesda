import { Test, TestingModule } from '@nestjs/testing';
import { LearnersRecordService } from './learners-record.service';

describe('LearnersRecordService', () => {
  let service: LearnersRecordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LearnersRecordService],
    }).compile();

    service = module.get<LearnersRecordService>(LearnersRecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
