import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateQualificationDto } from './dto/create-qualification.dto';
import { UpdateQualificationDto } from './dto/update-qualification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Qualification } from './entities/qualification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QualificationService {
  constructor(
    @InjectRepository(Qualification)
    private readonly qualificationRepository: Repository<Qualification>,
  ) { }

  async create(createQualificationDto: CreateQualificationDto): Promise<Qualification> {
    try {
      return await this.qualificationRepository.save(createQualificationDto);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<{ results: Qualification[]; total: number }> {
    const query = this.qualificationRepository
      .createQueryBuilder('qualification')
      .leftJoin(
        'qualification.nationalCertificateLevel',
        'nationalCertificateLevel',
      )
      .leftJoin('qualification.levelCompetency', 'levelCompetency')
      .leftJoin('levelCompetency.unitCompetency', 'unitCompetency')
      .leftJoin('unitCompetency.learningOutcome', 'learningOutcome')
      .select(['qualification.id AS id', 'qualification.name AS name', 'qualification.abbreviation AS abbreviation', 'nationalCertificateLevel', 'levelCompetency', 'unitCompetency', 'learningOutcome']);
    const [results, total] = await Promise.all([
      await query.getRawMany(),
      await query.getCount(),
    ]);
    try {
      return { results, total };
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findOne(id: number): Promise<Qualification> {
    try {
      return await this.qualificationRepository.findOneOrFail({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updateQualificationDto: UpdateQualificationDto): Promise<void> {
    try {
      await this.qualificationRepository.update(
        id,
        updateQualificationDto,
      );
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.qualificationRepository.delete(id);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
