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
import { LearnerDataRow } from '@/security/resources/interface/learners-data-row';

@Injectable()
export class LearnersInfoService {
  constructor(
    @InjectRepository(LearnersInfo)
    private readonly learnersInfoRepository: Repository<LearnersInfo>,
  ) { }

  async create(createLearnersInfoDto: CreateLearnersInfoDto): Promise<LearnersInfo> {
    try {
      return await this.learnersInfoRepository.save(createLearnersInfoDto);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async createUsingExcel(data: LearnerDataRow[]): Promise<LearnersInfo[]> {
    try {
      const learnersInfoArray = data.map((row) => {
        return {
          firstName: row[0],
          middleName: row[1],
          lastName: row[2],
          suffix: row[3],
          birthDate: row[4],
          gender: row[5],
          phoneNumber: row[6],
          address: row[7],
          municipality: row[8],
        }
      });

      console.log("hi", data)
      console.log("hello", learnersInfoArray)
      return await this.learnersInfoRepository.save(learnersInfoArray);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  // async findAll(
  //   isActive?: string,
  //   limit?: number,
  //   offset?: number,
  // ): Promise<LearnersInfo[]> {
  //   const query = this.learnersInfoRepository
  //     .createQueryBuilder('learnersInfo')
  //     .leftJoin('learnersInfo.municipality', 'municipality')
  //     .select([
  //       'learnersInfo.id AS id',
  //       'learnersInfo.firstName AS first_name',
  //       'learnersInfo.middleName AS middle_name',
  //       'learnersInfo.lastName AS last_name',
  //       'learnersInfo.suffix AS suffix',
  //       'learnersInfo.gender AS gender',
  //       'learnersInfo.phoneNumber AS phone_number',
  //       'learnersInfo.address AS address',
  //       'learnersInfo.isActive AS isActive',
  //       'municipality',
  //       `DATE_PART('year', AGE(NOW(), learnersInfo.birthDate)) AS age`,
  //       `TO_CHAR(learnersInfo.birthDate, 'YYYY-MM-DD') AS birth_date`,
  //     ]);

  //   if (isActive !== undefined) {
  //     query.andWhere('learnersInfo.isActive = :isActive', { isActive });
  //   }

  //   if (limit !== undefined) {
  //     query.limit(limit);
  //   }

  //   if (offset !== undefined) {
  //     query.offset(offset);
  //   }

  //   try {
  //     // const [data, total] = await Promise.all([
  //     //   query.getRawMany(),
  //     //   this.learnersInfoRepository.count(),
  //     // ]);

  //     return query.getRawMany();
  //   } catch (error) {
  //     throw new NotFoundException();
  //   }
  // }

  async findAll(
    isActive?: string,
  ): Promise<{ results: LearnersInfo[]; total: number }> {
    const query = this.learnersInfoRepository
      .createQueryBuilder('learnersInfo')
      .leftJoin('learnersInfo.municipality', 'municipality')
      .select([
        'learnersInfo.id AS id',
        'learnersInfo.firstName AS first_name',
        'learnersInfo.middleName AS middle_name',
        'learnersInfo.lastName AS last_name',
        'learnersInfo.suffix AS suffix',
        'learnersInfo.gender AS gender',
        'learnersInfo.phoneNumber AS phone_number',
        'learnersInfo.address AS address',
        'learnersInfo.isActive AS is_active',
        'municipality',
        `DATE_PART('year', AGE(NOW(), learnersInfo.birthDate)) AS age`,
        `TO_CHAR(learnersInfo.birthDate, 'YYYY-MM-DD') AS birth_date`,
      ]);

    if (isActive !== undefined) {
      query.andWhere('learnersInfo.isActive = :isActive', { isActive });
    }

    try {
      const [results, total] = await Promise.all([
        await query.getRawMany(),
        await query.clone().getCount(),
      ]);

      return { results, total };
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

  async update(id: number, updateLearnersInfoDto: UpdateLearnersInfoDto): Promise<void> {
    try {
      await this.learnersInfoRepository.update(
        id,
        updateLearnersInfoDto,
      );
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.learnersInfoRepository.delete(id);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
