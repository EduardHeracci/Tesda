import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LearnersRecordService } from './learners-record.service';
import { CreateLearnersRecordDto } from './dto/create-learners-record.dto';
import { UpdateLearnersRecordDto } from './dto/update-learners-record.dto';

@Controller('learners-record')
export class LearnersRecordController {
  constructor(private readonly learnersRecordService: LearnersRecordService) {}

  @Post()
  async create(@Body() createLearnersRecordDto: CreateLearnersRecordDto) {
    return await this.learnersRecordService.create(createLearnersRecordDto);
  }

  @Get()
  async findAll() {
    return await this.learnersRecordService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.learnersRecordService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLearnersRecordDto: UpdateLearnersRecordDto,
  ) {
    return await this.learnersRecordService.update(
      +id,
      updateLearnersRecordDto,
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.learnersRecordService.delete(+id);
  }
}
