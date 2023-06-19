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

@Controller('municipality')
export class MunicipalityController {
  constructor(private readonly municipalityService: MunicipalityService) {}

  @Post()
  async create(@Body() createMunicipalityDto: CreateMunicipalityDto) {
    return await this.municipalityService.create(createMunicipalityDto);
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
    return await this.municipalityService.update(+id, updateMunicipalityDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.municipalityService.delete(+id);
  }
}
