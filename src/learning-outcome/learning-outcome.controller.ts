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
import { EventsGateWay } from '@/security/resources/events/event.gateway';
import { LearningOutcome } from './entities/learning-outcome.entity';

@Controller('learning-outcome')
export class LearningOutcomeController {
  constructor(
    private readonly learningOutcomeService: LearningOutcomeService,
    private readonly eventsGateWay: EventsGateWay,
  ) { }

  @Post()
  async create(@Body() createLearningOutcomeDto: CreateLearningOutcomeDto): Promise<LearningOutcome> {
    const createdLearningOutcome = await this.learningOutcomeService.create(
      createLearningOutcomeDto,
    );
    this.eventsGateWay.server.emit(
      'createdLearningOutcome',
      createdLearningOutcome,
    );
    return createdLearningOutcome;
  }

  @Get()
  async findAll(): Promise<{
    results: LearningOutcome[];
    total: number;
  }> {
    return await this.learningOutcomeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<LearningOutcome> {
    return await this.learningOutcomeService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLearningOutcomeDto: UpdateLearningOutcomeDto,
  ): Promise<void> {
    const updatedLearningOutcome = await this.learningOutcomeService.update(
      +id,
      updateLearningOutcomeDto,
    );
    this.eventsGateWay.server.emit(
      'updatedLearningOutcome',
      updatedLearningOutcome,
    );
    return updatedLearningOutcome;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.learningOutcomeService.delete(+id);
  }
}
