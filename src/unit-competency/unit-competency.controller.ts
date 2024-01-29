import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UnitCompetencyService } from './unit-competency.service';
import { CreateUnitCompetencyDto } from './dto/create-unit-competency.dto';
import { UpdateUnitCompetencyDto } from './dto/update-unit-competency.dto';
import { EventsGateWay } from '@/security/resources/events/event.gateway';
import { UnitCompetency } from './entities/unit-competency.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { UnitCompetencyDataRow } from '@/security/resources/interface';
import xlsx from 'xlsx';

@Controller('unit-competency')
export class UnitCompetencyController {
  constructor(
    private readonly unitCompetencyService: UnitCompetencyService,
    private readonly eventsGateWay: EventsGateWay,
  ) { }

  @Post()
  async create(@Body() createUnitCompetencyDto: CreateUnitCompetencyDto): Promise<UnitCompetency> {
    const createdUnitCompetency = await this.unitCompetencyService.create(
      createUnitCompetencyDto,
    );
    this.eventsGateWay.server.emit(
      'createdUnitCompetency',
      createdUnitCompetency,
    );
    return createdUnitCompetency;
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async createUsingExcel(@UploadedFile() file: Express.Multer.File): Promise<UnitCompetency[]> {
    const workbook = xlsx.read(file.buffer, { type: 'buffer' });

    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    const data: UnitCompetencyDataRow[] = xlsx.utils.sheet_to_json(worksheet, { header: 1, range: 1 });
    const createdLearnersInfo =
      await this.unitCompetencyService.createUsingExcel(data);
    this.eventsGateWay.server.emit('createdExcelUnitCompetency', createdLearnersInfo);
    return createdLearnersInfo;
  }

  @Get()
  async findAll(@Query('isActive') isActive: string): Promise<{ results: UnitCompetency[], total: number }> {
    return await this.unitCompetencyService.findAll(isActive);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UnitCompetency> {
    return await this.unitCompetencyService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUnitCompetencyDto: UpdateUnitCompetencyDto,
  ): Promise<void[]> {

    const idArray = id.split(',').map(id => id);
    const updatedUnitCompetency = await Promise.all(
      idArray.map(id => this.unitCompetencyService.update(+id, updateUnitCompetencyDto))
    );
    this.eventsGateWay.server.emit(
      'updatedUnitCompetency',
      updatedUnitCompetency,
    );
    return updatedUnitCompetency;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.unitCompetencyService.delete(+id);
  }
}
