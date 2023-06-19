import { Test, TestingModule } from '@nestjs/testing';
import { LearnersRecordController } from './learners-record.controller';
import { LearnersRecordService } from './learners-record.service';

describe('LearnersRecordController', () => {
  let controller: LearnersRecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LearnersRecordController],
      providers: [LearnersRecordService],
    }).compile();

    controller = module.get<LearnersRecordController>(LearnersRecordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
