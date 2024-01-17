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
import { LearningOutcomeDataRow } from '@/security/resources/interface';

@Injectable()
export class LearningOutcomeService {
  constructor(
    @InjectRepository(LearningOutcome)
    private readonly learningOutcomeRepository: Repository<LearningOutcome>,
  ) { }

  async create(createLearningOutcomeDto: CreateLearningOutcomeDto): Promise<LearningOutcome> {
    try {
      return await this.learningOutcomeRepository.save(
        createLearningOutcomeDto,
      );
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async createUsingExcel(data: LearningOutcomeDataRow[]): Promise<LearningOutcome[]> {
    try {
      const learningOutcomeInfoArray = data.map((row) => {
        return {
          name: row[0],
          taskRequired: row[1],
        }
      });
      return await this.learningOutcomeRepository.save(learningOutcomeInfoArray);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findAll(isActive?: string): Promise<{ results: LearningOutcome[]; total: number }> {
    const query = this.learningOutcomeRepository.createQueryBuilder('learningOutcome');

    if (isActive !== undefined) {
      query.andWhere('learningOutcome.isActive = :isActive', { isActive });

    }
    try {
      const [results, total] = await Promise.all([
        await query.getMany(),
        await query.clone().getCount(),
      ]);
      return { results, total };
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

  async update(id: number, updateLearningOutcomeDto: UpdateLearningOutcomeDto): Promise<void> {
    try {
      await this.learningOutcomeRepository.update(
        id,
        updateLearningOutcomeDto,
      );
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.learningOutcomeRepository.delete(id);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
