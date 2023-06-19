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
import { HashingService } from 'src/security/resources/hashing.service';

@Injectable()
export class TrainerService {
  constructor(
    @InjectRepository(Trainer)
    private readonly trainerRepository: Repository<Trainer>,
    private readonly hashingService: HashingService,
  ) {}

  async create(createTrainerDto: CreateTrainerDto) {
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

  async findAll(): Promise<Trainer[]> {
    try {
      return await this.trainerRepository.find();
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

  async findOneBy(userName: string): Promise<Trainer> {
    try {
      return await this.trainerRepository.findOneOrFail({
        where: { userName },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async update(id: number, updateTrainerDto: UpdateTrainerDto) {
    try {
      return await this.trainerRepository.update(id, updateTrainerDto);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async delete(id: number) {
    try {
      return await this.trainerRepository.delete(id);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
