import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateNationalCertificateLevelDto } from './dto/create-national-certificate-level.dto';
import { UpdateNationalCertificateLevelDto } from './dto/update-national-certificate-level.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NationalCertificateLevel } from './entities/national-certificate-level.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NationalCertificateLevelService {
  constructor(
    @InjectRepository(NationalCertificateLevel)
    private readonly nationalCertificateLevelRepository: Repository<NationalCertificateLevel>,
  ) { }

  async create(
    createNationalCertificateLevelDto: CreateNationalCertificateLevelDto,
  ): Promise<NationalCertificateLevel> {
    try {
      return await this.nationalCertificateLevelRepository.save(
        createNationalCertificateLevelDto,
      );
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<{
    results: NationalCertificateLevel[];
    total: number;
  }> {
    const [results, total] = await Promise.all([
      await this.nationalCertificateLevelRepository.find(),
      await this.nationalCertificateLevelRepository.count(),
    ]);
    try {
      return { results, total };
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findOne(id: number): Promise<NationalCertificateLevel> {
    try {
      return await this.nationalCertificateLevelRepository.findOneOrFail({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(
    id: number,
    updateNationalCertificateLevelDto: UpdateNationalCertificateLevelDto,
  ): Promise<void> {
    try {
      await this.nationalCertificateLevelRepository.update(
        id,
        updateNationalCertificateLevelDto,
      );
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.nationalCertificateLevelRepository.delete(id);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
