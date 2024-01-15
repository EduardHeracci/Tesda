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
import { EventsGateWay } from '@/security/resources/events/event.gateway';
import { LearnersRecord } from './entities/learners-record.entity';

@Controller('learners-record')
export class LearnersRecordController {
  constructor(
    private readonly learnersRecordService: LearnersRecordService,
    private readonly eventsGateWay: EventsGateWay,
  ) { }

  @Post()
  async create(@Body() createLearnersRecordDto: CreateLearnersRecordDto): Promise<LearnersRecord> {
    const createdLearnersRecord = await this.learnersRecordService.create(
      createLearnersRecordDto,
    );
    this.eventsGateWay.server.emit(
      'createdLearnersRecord',
      createdLearnersRecord,
    );
    return createdLearnersRecord;
  }

  @Get()
  async findAll(): Promise<{
    results: LearnersRecord[];
    total: number;
  }> {
    return await this.learnersRecordService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<LearnersRecord> {
    return await this.learnersRecordService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLearnersRecordDto: UpdateLearnersRecordDto,
  ): Promise<void> {
    const updatedLearnersRecord = await this.learnersRecordService.update(
      +id,
      updateLearnersRecordDto,
    );
    this.eventsGateWay.server.emit(
      'updatedLearnersRecord',
      updatedLearnersRecord,
    );
    return updatedLearnersRecord;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.learnersRecordService.delete(+id);
  }
}
