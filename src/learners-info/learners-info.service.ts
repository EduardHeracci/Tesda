import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLearnersInfoDto } from './dto/create-learners-info.dto';
import { UpdateLearnersInfoDto } from './dto/update-learners-info.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LearnersInfo } from './entities/learners-info.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LearnersInfoService {
  constructor(
    @InjectRepository(LearnersInfo)
    private readonly learnersInfoRepository: Repository<LearnersInfo>,
  ) {}

  async create(createLearnersInfoDto: CreateLearnersInfoDto) {
    try {
      return await this.learnersInfoRepository.save(createLearnersInfoDto);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<LearnersInfo[]> {
    try {
      return await this.learnersInfoRepository.find();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findOne(id: number): Promise<LearnersInfo> {
    try {
      return await this.learnersInfoRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updateLearnersInfoDto: UpdateLearnersInfoDto) {
    try {
      return await this.learnersInfoRepository.update(
        id,
        updateLearnersInfoDto,
      );
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async delete(id: number) {
    try {
      return await this.learnersInfoRepository.delete(id);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
