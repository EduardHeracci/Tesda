import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MunicipalityService } from './municipality.service';
import { CreateMunicipalityDto } from './dto/create-municipality.dto';
import { UpdateMunicipalityDto } from './dto/update-municipality.dto';
import { EventsGateWay } from '@/security/resources/events/event.gateway';

@Controller('municipality')
export class MunicipalityController {
  constructor(
    private readonly municipalityService: MunicipalityService,
    private readonly eventsGateWay: EventsGateWay,
  ) {}

  @Post()
  async create(@Body() createMunicipalityDto: CreateMunicipalityDto) {
    const createdMunicipality = await this.municipalityService.create(
      createMunicipalityDto,
    );
    this.eventsGateWay.server.emit('createdMunicipality', createdMunicipality);
    return createdMunicipality;
  }

  @Get()
  async findAll() {
    return await this.municipalityService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.municipalityService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMunicipalityDto: UpdateMunicipalityDto,
  ) {
    const updatedMunicipality = await this.municipalityService.update(
      +id,
      updateMunicipalityDto,
    );
    this.eventsGateWay.server.emit('updatedMunicipality', updatedMunicipality);
    return updatedMunicipality;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.municipalityService.delete(+id);
  }
}
