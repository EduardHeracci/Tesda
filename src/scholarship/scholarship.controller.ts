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

@Controller('scholarship')
export class ScholarshipController {
  constructor(
    private readonly scholarshipService: ScholarshipService,
    private readonly eventsGateWay: EventsGateWay,
  ) {}

  @Post()
  async create(@Body() createScholarshipDto: CreateScholarshipDto) {
    const createdScholarship =
      await this.scholarshipService.create(createScholarshipDto);
    this.eventsGateWay.server.emit('createdScholarship', createdScholarship);
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
    const updatedScholarship = await this.scholarshipService.update(
      +id,
      updateScholarshipDto,
    );
    this.eventsGateWay.server.emit('updatedScholarship', updatedScholarship);
    return updatedScholarship;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.scholarshipService.delete(+id);
  }
}
