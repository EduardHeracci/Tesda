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

@Controller('learning-outcome')
export class LearningOutcomeController {
  constructor(
    private readonly learningOutcomeService: LearningOutcomeService,
    private readonly eventsGateWay: EventsGateWay,
  ) {}

  @Post()
  async create(@Body() createLearningOutcomeDto: CreateLearningOutcomeDto) {
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
  async findAll() {
    return await this.learningOutcomeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.learningOutcomeService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLearningOutcomeDto: UpdateLearningOutcomeDto,
  ) {
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
  async delete(@Param('id') id: string) {
    return await this.learningOutcomeService.delete(+id);
  }
}
