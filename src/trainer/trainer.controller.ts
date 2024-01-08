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
import { Public } from '@/security/resources/decorators/public.decorator';
import { EventsGateWay } from '@/security/resources/events/event.gateway';

@Controller('trainer')
export class TrainerController {
  constructor(
    private readonly trainerService: TrainerService,
    private readonly eventsGateWay: EventsGateWay,
  ) {}

  @Public()
  @Post()
  async create(@Body() createTrainerDto: CreateTrainerDto) {
    const createdTrainer = await this.trainerService.create(createTrainerDto);
    this.eventsGateWay.server.emit('createdTrainer', createdTrainer);
    return createdTrainer;
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
    const updatedTrainer = await this.trainerService.update(
      +id,
      updateTrainerDto,
    );
    this.eventsGateWay.server.emit('updatedTrainer', updatedTrainer);
    return updatedTrainer;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.trainerService.delete(+id);
  }
}
