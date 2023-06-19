import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TrainerService } from './trainer.service';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';

@Controller('trainer')
export class TrainerController {
  constructor(private readonly trainerService: TrainerService) {}

  @Post()
  async create(@Body() createTrainerDto: CreateTrainerDto) {
    return await this.trainerService.create(createTrainerDto);
  }

  @Get()
  async findAll() {
    return await this.trainerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.trainerService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTrainerDto: UpdateTrainerDto,
  ) {
    return await this.trainerService.update(+id, updateTrainerDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.trainerService.delete(+id);
  }
}
