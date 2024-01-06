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

  async createUsingExcel(data: any[]) {
    try {
      const learnersInfoArray = data.map((row) => {
        const [
          firstName,
          middleName,
          lastName,
          suffix,
          birthDate,
          gender,
          phoneNumber,
          address,
          municipality,
        ] = row;

        const entity = new LearnersInfo();
        entity.firstName = firstName;
        entity.middleName = middleName;
        entity.lastName = lastName;
        entity.suffix = suffix;
        entity.birthDate = new Date(birthDate);
        entity.gender = gender;
        entity.phoneNumber = phoneNumber;
        entity.address = address;
        entity.municipality = municipality;

        return entity;
      });

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
  ): Promise<{ data: LearnersInfo[]; total: number }> {
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
        'learnersInfo.isActive AS isActive',
        'municipality',
        `DATE_PART('year', AGE(NOW(), learnersInfo.birthDate)) AS age`,
        `TO_CHAR(learnersInfo.birthDate, 'YYYY-MM-DD') AS birth_date`,
      ]);

    if (isActive !== undefined) {
      query.andWhere('learnersInfo.isActive = :isActive', { isActive });
    }

    try {
      const [data, total] = await Promise.all([
        query.getRawMany(),
        this.learnersInfoRepository.count(),
      ]);

      return { data, total };
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async countAll(): Promise<LearnersInfo[]> {
    const query = this.learnersInfoRepository
      .createQueryBuilder('learnersInfo')
      .select('COUNT(learnersInfo.id) AS total_learners');

    try {
      return await query.getRawMany();
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
