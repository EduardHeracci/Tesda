import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LevelCompetencyService } from './level-competency.service';
import { CreateLevelCompetencyDto } from './dto/create-level-competency.dto';
import { UpdateLevelCompetencyDto } from './dto/update-level-competency.dto';
import { EventsGateWay } from '@/security/resources/events/event.gateway';
import { LevelCompetency } from './entities/level-competency.entity';

@Controller('level-competency')
export class LevelCompetencyController {
  constructor(
    private readonly levelCompetencyService: LevelCompetencyService,
    private readonly eventsGateWay: EventsGateWay,
  ) { }

  @Post()
  async create(@Body() createLevelCompetencyDto: CreateLevelCompetencyDto): Promise<LevelCompetency> {
    const createdLevelCompetency = await this.levelCompetencyService.create(
      createLevelCompetencyDto,
    );
    this.eventsGateWay.server.emit(
      'createdLevelCompetency',
      createdLevelCompetency,
    );
    return createdLevelCompetency;
  }

  @Get()
  async findAll(): Promise<{
    results: LevelCompetency[];
    total: number;
  }> {
    return await this.levelCompetencyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<LevelCompetency> {
    return await this.levelCompetencyService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLevelCompetencyDto: UpdateLevelCompetencyDto,
  ): Promise<void> {
    const updatedLevelCompetency = await this.levelCompetencyService.update(
      +id,
      updateLevelCompetencyDto,
    );
    this.eventsGateWay.server.emit(
      'updatedLevelCompetency',
      updatedLevelCompetency,
    );
    return updatedLevelCompetency;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.levelCompetencyService.delete(+id);
  }
}
