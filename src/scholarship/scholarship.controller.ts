import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ScholarshipService } from './scholarship.service';
import { CreateScholarshipDto } from './dto/create-scholarship.dto';
import { UpdateScholarshipDto } from './dto/update-scholarship.dto';

@Controller('scholarship')
export class ScholarshipController {
  constructor(private readonly scholarshipService: ScholarshipService) {}

  @Post()
  async create(@Body() createScholarshipDto: CreateScholarshipDto) {
    return await this.scholarshipService.create(createScholarshipDto);
  }

  @Get()
  async findAll() {
    return await this.scholarshipService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.scholarshipService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateScholarshipDto: UpdateScholarshipDto,
  ) {
    return await this.scholarshipService.update(+id, updateScholarshipDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.scholarshipService.delete(+id);
  }
}
