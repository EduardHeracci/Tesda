import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUnitCompetencyDto } from './dto/create-unit-competency.dto';
import { UpdateUnitCompetencyDto } from './dto/update-unit-competency.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UnitCompetency } from './entities/unit-competency.entity';
import { Repository } from 'typeorm';
import { UnitCompetencyDataRow } from '@/security/resources/interface';

@Injectable()
export class UnitCompetencyService {
  constructor(
    @InjectRepository(UnitCompetency)
    private readonly unitCompetencyRepository: Repository<UnitCompetency>,
  ) { }

  async create(createUnitCompetencyDto: CreateUnitCompetencyDto): Promise<UnitCompetency> {
    try {
      return await this.unitCompetencyRepository.save(createUnitCompetencyDto);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async createUsingExcel(data: UnitCompetencyDataRow[]): Promise<UnitCompetency[]> {
    try {
      const learningOutcomeInfoArray = data.map((row) => {
        return {
          name: row[0],
          unitCompetencyCode: row[1],
          learningOutcome: row[2],
        }
      });
      return await this.unitCompetencyRepository.save(learningOutcomeInfoArray);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findAll(isActive: string): Promise<{ results: UnitCompetency[], total: number }> {
    const query = this.unitCompetencyRepository.createQueryBuilder('unitCompetency')
      .leftJoin('unitCompetency.learningOutcome', 'learningOutcome')
      .select([
        'unitCompetency.id AS id',
        'unitCompetency.name AS name',
        'unitCompetency.unitCompetencyCode AS unit_competency_code',
        'learningOutcome'
      ])

    if (isActive !== undefined) {
      query.andWhere('unitCompetency.isActive = :isActive', { isActive })
    }

    try {
      const [results, total] = await Promise.all([
        await query.getRawMany(),
        await query.clone().getCount()
      ])

      return { results, total }
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findOne(id: number): Promise<UnitCompetency> {
    try {
      return await this.unitCompetencyRepository.findOneOrFail({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updateUnitCompetencyDto: UpdateUnitCompetencyDto): Promise<void> {
    try {
      await this.unitCompetencyRepository.update(
        id,
        updateUnitCompetencyDto,
      );
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.unitCompetencyRepository.delete(id);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
