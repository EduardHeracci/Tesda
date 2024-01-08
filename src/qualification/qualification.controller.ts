import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QualificationService } from './qualification.service';
import { CreateQualificationDto } from './dto/create-qualification.dto';
import { UpdateQualificationDto } from './dto/update-qualification.dto';
import { EventsGateWay } from '@/security/resources/events/event.gateway';

@Controller('qualification')
export class QualificationController {
  constructor(
    private readonly qualificationService: QualificationService,
    private readonly eventsGateWay: EventsGateWay,
  ) {}

  @Post()
  async create(@Body() createQualificationDto: CreateQualificationDto) {
    const createdQualification = await this.qualificationService.create(
      createQualificationDto,
    );
    this.eventsGateWay.server.emit(
      'createdQualification',
      createdQualification,
    );
    return createdQualification;
  }

  @Get()
  async findAll() {
    return await this.qualificationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.qualificationService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateQualificationDto: UpdateQualificationDto,
  ) {
    const updatedQualification = await this.qualificationService.update(
      +id,
      updateQualificationDto,
    );
    this.eventsGateWay.server.emit(
      'updatedQualification',
      updatedQualification,
    );
    return updatedQualification;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.qualificationService.delete(+id);
  }
}
