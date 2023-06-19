import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMunicipalityDto } from './dto/create-municipality.dto';
import { UpdateMunicipalityDto } from './dto/update-municipality.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Municipality } from './entities/municipality.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MunicipalityService {
  constructor(
    @InjectRepository(Municipality)
    private readonly municipalityRepository: Repository<Municipality>,
  ) {}

  async create(createMunicipalityDto: CreateMunicipalityDto) {
    try {
      return await this.municipalityRepository.save(createMunicipalityDto);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<Municipality[]> {
    try {
      return await this.municipalityRepository.find();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findOne(id: number): Promise<Municipality> {
    try {
      return await this.municipalityRepository.findOneOrFail({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updateMunicipalityDto: UpdateMunicipalityDto) {
    try {
      return await this.municipalityRepository.update(
        id,
        updateMunicipalityDto,
      );
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async delete(id: number) {
    try {
      return await this.municipalityRepository.delete(id);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
