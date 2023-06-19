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

@Injectable()
export class UnitCompetencyService {
  constructor(
    @InjectRepository(UnitCompetency)
    private readonly unitCompetencyRepository: Repository<UnitCompetency>,
  ) {}

  async create(createUnitCompetencyDto: CreateUnitCompetencyDto) {
    try {
      return await this.unitCompetencyRepository.save(createUnitCompetencyDto);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<UnitCompetency[]> {
    try {
      return await this.unitCompetencyRepository.find();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findOne(id: string): Promise<UnitCompetency> {
    try {
      return await this.unitCompetencyRepository.findOneOrFail({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updateUnitCompetencyDto: UpdateUnitCompetencyDto) {
    try {
      return await this.unitCompetencyRepository.update(
        id,
        updateUnitCompetencyDto,
      );
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async delete(id: number) {
    try {
      return await this.unitCompetencyRepository.delete(id);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
