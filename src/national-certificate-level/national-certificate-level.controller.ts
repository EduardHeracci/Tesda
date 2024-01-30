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
import { NationalCertificateLevel } from './entities/national-certificate-level.entity';

@Controller('national-certificate-level')
export class NationalCertificateLevelController {
  constructor(
    private readonly nationalCertificateLevelService: NationalCertificateLevelService,
    private readonly eventsGateWay: EventsGateWay,
  ) { }

  @Post()
  async create(
    @Body()
    createNationalCertificateLevelDto: CreateNationalCertificateLevelDto,
  ): Promise<NationalCertificateLevel> {
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
  async findAll(): Promise<{
    results: NationalCertificateLevel[];
    total: number;
  }> {
    return await this.nationalCertificateLevelService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<NationalCertificateLevel> {
    return await this.nationalCertificateLevelService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body()
    updateNationalCertificateLevelDto: UpdateNationalCertificateLevelDto,
  ): Promise<void[]> {
    const idArray = id.split(',').map(id => id);
    const updatedNationalCertificateLevel =
      await Promise.all(idArray.map(id => this.nationalCertificateLevelService.update(
        +id,
        updateNationalCertificateLevelDto,
      )));
    this.eventsGateWay.server.emit(
      'updatedNationalCertificateLevel',
      updatedNationalCertificateLevel,
    );
    return updatedNationalCertificateLevel;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.nationalCertificateLevelService.delete(+id);
  }
}
