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
import { EventsGateWay } from '@/security/resources/events/event.gateway';
import { Scholarship } from './entities/scholarship.entity';

@Controller('scholarship')
export class ScholarshipController {
  constructor(
    private readonly scholarshipService: ScholarshipService,
    private readonly eventsGateWay: EventsGateWay,
  ) { }

  @Post()
  async create(@Body() createScholarshipDto: CreateScholarshipDto): Promise<Scholarship> {
    const createdScholarship =
      await this.scholarshipService.create(createScholarshipDto);
    this.eventsGateWay.server.emit('createdScholarship', createdScholarship);
    return createdScholarship
  }

  @Get()
  async findAll(): Promise<{ results: Scholarship[]; total: number }> {
    return await this.scholarshipService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Scholarship> {
    return await this.scholarshipService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateScholarshipDto: UpdateScholarshipDto,
  ): Promise<void> {
    const updatedScholarship = await this.scholarshipService.update(
      +id,
      updateScholarshipDto,
    );
    this.eventsGateWay.server.emit('updatedScholarship', updatedScholarship);
    return updatedScholarship
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.scholarshipService.delete(+id);
  }
}
