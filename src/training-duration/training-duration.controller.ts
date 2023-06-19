import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TrainingDurationService } from './training-duration.service';
import { CreateTrainingDurationDto } from './dto/create-training-duration.dto';
import { UpdateTrainingDurationDto } from './dto/update-training-duration.dto';

@Controller('training-duration')
export class TrainingDurationController {
  constructor(
    private readonly trainingDurationService: TrainingDurationService,
  ) {}

  @Post()
  async create(@Body() createTrainingDurationDto: CreateTrainingDurationDto) {
    return await this.trainingDurationService.create(createTrainingDurationDto);
  }

  @Get()
  async findAll() {
    return await this.trainingDurationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.trainingDurationService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTrainingDurationDto: UpdateTrainingDurationDto,
  ) {
    return await this.trainingDurationService.update(
      +id,
      updateTrainingDurationDto,
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.trainingDurationService.delete(+id);
  }
}
