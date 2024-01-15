import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrainingDurationDto } from './dto/create-training-duration.dto';
import { UpdateTrainingDurationDto } from './dto/update-training-duration.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TrainingDuration } from './entities/training-duration.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TrainingDurationService {
  constructor(
    @InjectRepository(TrainingDuration)
    private readonly trainingDurationRepository: Repository<TrainingDuration>,
  ) { }

  async create(createTrainingDurationDto: CreateTrainingDurationDto): Promise<TrainingDuration> {
    try {
      return await this.trainingDurationRepository.save(
        createTrainingDurationDto,
      );
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<{ results: TrainingDuration[]; total: number }> {
    const query = await this.trainingDurationRepository
      .createQueryBuilder('trainingDuration')
      .leftJoinAndSelect('trainingDuration.trainer', 'trainer')
      .leftJoinAndSelect('trainingDuration.scholarship', 'scholarship')
      .leftJoinAndSelect('trainingDuration.qualification', 'qualification');
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

  async findOne(id: number): Promise<TrainingDuration> {
    try {
      return await this.trainingDurationRepository.findOneOrFail({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(
    id: number,
    updateTrainingDurationDto: UpdateTrainingDurationDto,
  ): Promise<void> {
    try {
      await this.trainingDurationRepository.update(
        id,
        updateTrainingDurationDto,
      );
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.trainingDurationRepository.delete(id);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
