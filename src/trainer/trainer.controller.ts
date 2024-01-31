import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TrainerService } from './trainer.service';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { Public } from '@/security/resources/decorators/public.decorator';
import { EventsGateWay } from '@/security/resources/events/event.gateway';
import { Trainer } from './entities/trainer.entity';

@Controller('trainer')
export class TrainerController {
  constructor(
    private readonly trainerService: TrainerService,
    private readonly eventsGateWay: EventsGateWay,
  ) { }

  @Public()
  @Post()
  async create(@Body() createTrainerDto: CreateTrainerDto): Promise<Trainer> {
    const createdTrainer = await this.trainerService.create(createTrainerDto);
    this.eventsGateWay.server.emit('createdTrainer', createdTrainer);
    return createdTrainer;
  }

  @Get()
  async findAll(@Query('isActive') isActive?: string): Promise<{ results: Trainer[]; total: number }> {
    return await this.trainerService.findAll(isActive);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Trainer> {
    return await this.trainerService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTrainerDto: UpdateTrainerDto,
  ): Promise<void> {
    const updatedTrainer = await this.trainerService.update(
      +id,
      updateTrainerDto,
    );
    this.eventsGateWay.server.emit('updatedTrainer', updatedTrainer);
    return updatedTrainer
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.trainerService.delete(+id);
  }
}
