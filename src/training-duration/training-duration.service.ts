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
  ) {}

  async create(createTrainingDurationDto: CreateTrainingDurationDto) {
    try {
      return await this.trainingDurationRepository.save(
        createTrainingDurationDto,
      );
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<TrainingDuration[]> {
    try {
      return await this.trainingDurationRepository.find();
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
  ) {
    try {
      return await this.trainingDurationRepository.update(
        id,
        updateTrainingDurationDto,
      );
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async delete(id: number) {
    try {
      return await this.trainingDurationRepository.delete(id);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
