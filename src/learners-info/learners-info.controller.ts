import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { LearnersInfoService } from './learners-info.service';
import { CreateLearnersInfoDto } from './dto/create-learners-info.dto';
import { UpdateLearnersInfoDto } from './dto/update-learners-info.dto';
import { EventsGateWay } from '@/security/resources/events/event.gateway';

@Controller('learners-info')
export class LearnersInfoController {
  constructor(
    private readonly learnersInfoService: LearnersInfoService,
    private readonly eventsGateWay: EventsGateWay,
  ) {}

  @Post()
  async create(@Body() createLearnersInfoDto: CreateLearnersInfoDto) {
    const createdLearnersInfo = await this.learnersInfoService.create(
      createLearnersInfoDto,
    );
    this.eventsGateWay.server.emit('createdLearnersInfo', createdLearnersInfo);
    return createdLearnersInfo;
  }

  @Get()
  async findAll(
    @Query('id') id?: string,
    @Query('isActive') isActive?: string,
  ) {
    const idArray = id ? id.split(',').map((id) => +id) : undefined;
    return await this.learnersInfoService.findAll(idArray, isActive);
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
    const updatedLearnersInfo = await this.learnersInfoService.update(
      +id,
      updateLearnersInfoDto,
    );
    this.eventsGateWay.server.emit('updatedLearnersInfo', updatedLearnersInfo);
    return updatedLearnersInfo;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.learnersInfoService.delete(+id);
  }
}
