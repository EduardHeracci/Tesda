import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLevelCompetencyDto } from './dto/create-level-competency.dto';
import { UpdateLevelCompetencyDto } from './dto/update-level-competency.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LevelCompetency } from './entities/level-competency.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LevelCompetencyService {
  constructor(
    @InjectRepository(LevelCompetency)
    private readonly levelCompetencyRepository: Repository<LevelCompetency>,
  ) { }

  async create(createLevelCompetencyDto: CreateLevelCompetencyDto): Promise<LevelCompetency> {
    try {
      return await this.levelCompetencyRepository.save(
        createLevelCompetencyDto,
      );
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<{ results: LevelCompetency[]; total: number }> {
    const query = this.levelCompetencyRepository
      .createQueryBuilder('levelCompetency')
      .leftJoin('levelCompetency.unitCompetency', 'unitCompetency')
      .select(['levelCompetency', 'unitCompetency']);
    try {
      const [results, total] = await Promise.all([
        await query.getRawMany(),
        await query.getCount(),
      ]);
      return { results, total };
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findOne(id: number): Promise<LevelCompetency> {
    try {
      return await this.levelCompetencyRepository.findOneOrFail({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updateLevelCompetencyDto: UpdateLevelCompetencyDto): Promise<void> {
    try {
      await this.levelCompetencyRepository.update(
        id,
        updateLevelCompetencyDto,
      );
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.levelCompetencyRepository.delete(id);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
