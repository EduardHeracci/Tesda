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
import { Qualification } from './entities/qualification.entity';

@Controller('qualification')
export class QualificationController {
  constructor(
    private readonly qualificationService: QualificationService,
    private readonly eventsGateWay: EventsGateWay,
  ) { }

  @Post()
  async create(@Body() createQualificationDto: CreateQualificationDto): Promise<Qualification> {
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
  async findAll(): Promise<{ results: Qualification[]; total: number }> {
    return await this.qualificationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Qualification> {
    return await this.qualificationService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateQualificationDto: UpdateQualificationDto,
  ): Promise<void[]> {
    const idArray = id.split(',').map(id => id);
    const updatedQualification = await Promise.all(idArray.map(id => this.qualificationService.update(
      +id,
      updateQualificationDto,
    )));
    this.eventsGateWay.server.emit(
      'updatedQualification',
      updatedQualification,
    );
    return updatedQualification;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.qualificationService.delete(+id);
  }
}
