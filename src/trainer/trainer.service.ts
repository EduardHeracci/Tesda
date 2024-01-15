import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Trainer } from './entities/trainer.entity';
import { Repository } from 'typeorm';
import { HashingService } from '@/security/resources/hashing.service';

@Injectable()
export class TrainerService {
  constructor(
    @InjectRepository(Trainer)
    private readonly trainerRepository: Repository<Trainer>,
    private readonly hashingService: HashingService,
  ) { }

  async create(createTrainerDto: CreateTrainerDto): Promise<Trainer> {
    const hashedPassword = await this.hashingService.hash(
      createTrainerDto.password,
    );
    const newUser = {
      ...createTrainerDto,
      password: hashedPassword,
    };
    try {
      return await this.trainerRepository.save(newUser);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<{ results: Trainer[]; total: number }> {
    const [results, total] = await Promise.all([
      await this.trainerRepository.find(),
      await this.trainerRepository.count(),
    ]);
    try {
      return { results, total };
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findOne(id: number): Promise<Trainer> {
    try {
      return await this.trainerRepository.findOneOrFail({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  // async findOneBy(username: string): Promise<Trainer> {
  //   try {
  //     return await this.trainerRepository.findOneOrFail({
  //       where: { username },
  //     });
  //   } catch (error) {
  //     throw new BadRequestException();
  //   }
  // }

  async update(id: number, updateTrainerDto: UpdateTrainerDto): Promise<void> {
    try {
      await this.trainerRepository.update(id, updateTrainerDto);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.trainerRepository.delete(id);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
