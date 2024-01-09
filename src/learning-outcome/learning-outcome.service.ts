import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLearningOutcomeDto } from './dto/create-learning-outcome.dto';
import { UpdateLearningOutcomeDto } from './dto/update-learning-outcome.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LearningOutcome } from './entities/learning-outcome.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LearningOutcomeService {
  constructor(
    @InjectRepository(LearningOutcome)
    private readonly learningOutcomeRepository: Repository<LearningOutcome>,
  ) {}

  async create(createLearningOutcomeDto: CreateLearningOutcomeDto) {
    try {
      return await this.learningOutcomeRepository.save(
        createLearningOutcomeDto,
      );
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<LearningOutcome[]> {
    try {
      return await this.learningOutcomeRepository.find();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findOne(id: number): Promise<LearningOutcome> {
    try {
      return await this.learningOutcomeRepository.findOneOrFail({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updateLearningOutcomeDto: UpdateLearningOutcomeDto) {
    try {
      return await this.learningOutcomeRepository.update(
        id,
        updateLearningOutcomeDto,
      );
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async delete(id: number) {
    try {
      return await this.learningOutcomeRepository.delete(id);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
