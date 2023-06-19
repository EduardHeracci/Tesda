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

@Controller('unit-competency')
export class UnitCompetencyController {
  constructor(private readonly unitCompetencyService: UnitCompetencyService) {}

  @Post()
  async create(@Body() createUnitCompetencyDto: CreateUnitCompetencyDto) {
    return await this.unitCompetencyService.create(createUnitCompetencyDto);
  }

  @Get()
  async findAll() {
    return await this.unitCompetencyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.unitCompetencyService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUnitCompetencyDto: UpdateUnitCompetencyDto,
  ) {
    return await this.unitCompetencyService.update(
      +id,
      updateUnitCompetencyDto,
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.unitCompetencyService.delete(+id);
  }
}
