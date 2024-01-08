import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NationalCertificateLevelService } from './national-certificate-level.service';
import { CreateNationalCertificateLevelDto } from './dto/create-national-certificate-level.dto';
import { UpdateNationalCertificateLevelDto } from './dto/update-national-certificate-level.dto';
import { EventsGateWay } from '@/security/resources/events/event.gateway';

@Controller('national-certificate-level')
export class NationalCertificateLevelController {
  constructor(
    private readonly nationalCertificateLevelService: NationalCertificateLevelService,
    private readonly eventsGateWay: EventsGateWay,
  ) {}

  @Post()
  async create(
    @Body()
    createNationalCertificateLevelDto: CreateNationalCertificateLevelDto,
  ) {
    const createdNationalCertificateLevel =
      await this.nationalCertificateLevelService.create(
        createNationalCertificateLevelDto,
      );
    this.eventsGateWay.server.emit(
      'createdNationalCertificateLevel',
      createdNationalCertificateLevel,
    );
    return createdNationalCertificateLevel;
  }

  @Get()
  async findAll() {
    return await this.nationalCertificateLevelService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.nationalCertificateLevelService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body()
    updateNationalCertificateLevelDto: UpdateNationalCertificateLevelDto,
  ) {
    const updatedNationalCertificateLevel =
      await this.nationalCertificateLevelService.update(
        +id,
        updateNationalCertificateLevelDto,
      );
    this.eventsGateWay.server.emit(
      'updatedNationalCertificateLevel',
      updatedNationalCertificateLevel,
    );
    return updatedNationalCertificateLevel;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.nationalCertificateLevelService.delete(+id);
  }
}
