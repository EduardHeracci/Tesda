import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateScholarshipDto } from './dto/create-scholarship.dto';
import { UpdateScholarshipDto } from './dto/update-scholarship.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Scholarship } from './entities/scholarship.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ScholarshipService {
  constructor(
    @InjectRepository(Scholarship)
    private readonly scholarshipRepository: Repository<Scholarship>,
  ) { }

  async create(createScholarshipDto: CreateScholarshipDto): Promise<Scholarship> {
    try {
      return await this.scholarshipRepository.save(createScholarshipDto);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<{ results: Scholarship[]; total: number }> {
    const [results, total] = await Promise.all([
      await this.scholarshipRepository.find(),
      await this.scholarshipRepository.count(),
    ]);
    try {
      return { results, total };
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findOne(id: number): Promise<Scholarship> {
    try {
      return await this.scholarshipRepository.findOneOrFail({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updateScholarshipDto: UpdateScholarshipDto): Promise<void> {
    try {
      await this.scholarshipRepository.update(id, updateScholarshipDto);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.scholarshipRepository.delete(id);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
