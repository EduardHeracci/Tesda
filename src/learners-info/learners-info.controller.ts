import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LearnersInfoService } from './learners-info.service';
import { CreateLearnersInfoDto } from './dto/create-learners-info.dto';
import { UpdateLearnersInfoDto } from './dto/update-learners-info.dto';

@Controller('learners-info')
export class LearnersInfoController {
  constructor(private readonly learnersInfoService: LearnersInfoService) {}

  @Post()
  async create(@Body() createLearnersInfoDto: CreateLearnersInfoDto) {
    return await this.learnersInfoService.create(createLearnersInfoDto);
  }

  @Get()
  async findAll() {
    return await this.learnersInfoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.learnersInfoService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLearnersInfoDto: UpdateLearnersInfoDto,
  ) {
    return await this.learnersInfoService.update(+id, updateLearnersInfoDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.learnersInfoService.delete(+id);
  }
}
