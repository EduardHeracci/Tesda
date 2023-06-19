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

@Controller('level-competency')
export class LevelCompetencyController {
  constructor(
    private readonly levelCompetencyService: LevelCompetencyService,
  ) {}

  @Post()
  async create(@Body() createLevelCompetencyDto: CreateLevelCompetencyDto) {
    return await this.levelCompetencyService.create(createLevelCompetencyDto);
  }

  @Get()
  async findAll() {
    return await this.levelCompetencyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.levelCompetencyService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLevelCompetencyDto: UpdateLevelCompetencyDto,
  ) {
    return await this.levelCompetencyService.update(
      +id,
      updateLevelCompetencyDto,
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.levelCompetencyService.delete(+id);
  }
}
