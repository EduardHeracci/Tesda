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
import { EventsGateWay } from '@/security/resources/events/event.gateway';

@Controller('training-duration')
export class TrainingDurationController {
  constructor(
    private readonly trainingDurationService: TrainingDurationService,
    private readonly eventsGateWay: EventsGateWay,
  ) {}

  @Post()
  async create(@Body() createTrainingDurationDto: CreateTrainingDurationDto) {
    const createdTrainingDuration = await this.trainingDurationService.create(
      createTrainingDurationDto,
    );
    this.eventsGateWay.server.emit(
      'createdTrainingDuration',
      createdTrainingDuration,
    );
    return createdTrainingDuration;
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
    const updatedTrainingDuration = await this.trainingDurationService.update(
      +id,
      updateTrainingDurationDto,
    );
    this.eventsGateWay.server.emit(
      'updatedTrainingDuration',
      updatedTrainingDuration,
    );
    return updatedTrainingDuration;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.trainingDurationService.delete(+id);
  }
}
