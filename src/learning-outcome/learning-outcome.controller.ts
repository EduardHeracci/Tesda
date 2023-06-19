import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LearningOutcomeService } from './learning-outcome.service';
import { CreateLearningOutcomeDto } from './dto/create-learning-outcome.dto';
import { UpdateLearningOutcomeDto } from './dto/update-learning-outcome.dto';

@Controller('learning-outcome')
export class LearningOutcomeController {
  constructor(
    private readonly learningOutcomeService: LearningOutcomeService,
  ) {}

  @Post()
  async create(@Body() createLearningOutcomeDto: CreateLearningOutcomeDto) {
    return await this.learningOutcomeService.create(createLearningOutcomeDto);
  }

  @Get()
  async findAll() {
    return await this.learningOutcomeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.learningOutcomeService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLearningOutcomeDto: UpdateLearningOutcomeDto,
  ) {
    return await this.learningOutcomeService.update(
      +id,
      updateLearningOutcomeDto,
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.learningOutcomeService.delete(+id);
  }
}
