import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UnitCompetencyService } from './unit-competency.service';
import { CreateUnitCompetencyDto } from './dto/create-unit-competency.dto';
import { UpdateUnitCompetencyDto } from './dto/update-unit-competency.dto';
import { EventsGateWay } from '@/security/resources/events/event.gateway';
import { UnitCompetency } from './entities/unit-competency.entity';

@Controller('unit-competency')
export class UnitCompetencyController {
  constructor(
    private readonly unitCompetencyService: UnitCompetencyService,
    private readonly eventsGateWay: EventsGateWay,
  ) { }

  @Post()
  async create(@Body() createUnitCompetencyDto: CreateUnitCompetencyDto): Promise<UnitCompetency> {
    const createdUnitCompetency = await this.unitCompetencyService.create(
      createUnitCompetencyDto,
    );
    this.eventsGateWay.server.emit(
      'createdUnitCompetency',
      createdUnitCompetency,
    );
    return createdUnitCompetency;
  }

  @Get()
  async findAll(): Promise<UnitCompetency[]> {
    return await this.unitCompetencyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UnitCompetency> {
    return await this.unitCompetencyService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUnitCompetencyDto: UpdateUnitCompetencyDto,
  ): Promise<void> {
    const updatedUnitCompetency = await this.unitCompetencyService.update(
      +id,
      updateUnitCompetencyDto,
    );
    this.eventsGateWay.server.emit(
      'updatedUnitCompetency',
      updatedUnitCompetency,
    );
    return updatedUnitCompetency;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.unitCompetencyService.delete(+id);
  }
}
