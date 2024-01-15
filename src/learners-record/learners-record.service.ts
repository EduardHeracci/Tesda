import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLearnersRecordDto } from './dto/create-learners-record.dto';
import { UpdateLearnersRecordDto } from './dto/update-learners-record.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LearnersRecord } from './entities/learners-record.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LearnersRecordService {
  constructor(
    @InjectRepository(LearnersRecord)
    private readonly learnersRecordRepository: Repository<LearnersRecord>,
  ) { }

  async create(createLearnersRecordDto: CreateLearnersRecordDto): Promise<LearnersRecord> {
    try {
      return await this.learnersRecordRepository.save(createLearnersRecordDto);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<{ results: LearnersRecord[]; total: number }> {
    const query = this.learnersRecordRepository
      .createQueryBuilder('learnersRecord')
      .leftJoinAndSelect('learnersRecord.learnersInfo', 'learnersInfo')
      .leftJoinAndSelect('learnersRecord.trainingDuration', 'trainingDuration');
    try {
      const [results, total] = await Promise.all([
        await query.getMany(),
        await query.getCount(),
      ]);

      return { results, total };
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findOne(id: number): Promise<LearnersRecord> {
    try {
      return await this.learnersRecordRepository.findOneOrFail({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updateLearnersRecordDto: UpdateLearnersRecordDto): Promise<void> {
    try {
      await this.learnersRecordRepository.update(
        id,
        updateLearnersRecordDto,
      );
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.learnersRecordRepository.delete(id);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
