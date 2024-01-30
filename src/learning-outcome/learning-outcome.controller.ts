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
import { LearningOutcomeService } from './learning-outcome.service';
import { CreateLearningOutcomeDto } from './dto/create-learning-outcome.dto';
import { UpdateLearningOutcomeDto } from './dto/update-learning-outcome.dto';
import { EventsGateWay } from '@/security/resources/events/event.gateway';
import { LearningOutcome } from './entities/learning-outcome.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { LearningOutcomeDataRow } from '@/security/resources/interface';
import xlsx from 'xlsx';

@Controller('learning-outcome')
export class LearningOutcomeController {
  constructor(
    private readonly learningOutcomeService: LearningOutcomeService,
    private readonly eventsGateWay: EventsGateWay,
  ) { }

  @Post()
  async create(@Body() createLearningOutcomeDto: CreateLearningOutcomeDto): Promise<LearningOutcome> {
    const createdLearningOutcome = await this.learningOutcomeService.create(
      createLearningOutcomeDto,
    );
    this.eventsGateWay.server.emit(
      'createdLearningOutcome',
      createdLearningOutcome,
    );
    return createdLearningOutcome;
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async createUsingExcel(@UploadedFile() file: Express.Multer.File): Promise<LearningOutcome[]> {
    const workbook = xlsx.read(file.buffer, { type: 'buffer' });

    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    const data: LearningOutcomeDataRow[] = xlsx.utils.sheet_to_json(worksheet, { header: 1, range: 1 });
    const createdLearnersInfo =
      await this.learningOutcomeService.createUsingExcel(data);
    this.eventsGateWay.server.emit('createdExcelLearningOutcome', createdLearnersInfo);
    return createdLearnersInfo;
  }

  @Get()
  async findAll(@Query('isActive') isActive?: string): Promise<{
    results: LearningOutcome[];
    total: number;
  }> {
    return await this.learningOutcomeService.findAll(isActive);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<LearningOutcome> {
    return await this.learningOutcomeService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLearningOutcomeDto: UpdateLearningOutcomeDto,
  ): Promise<void[]> {
    const idArray = id.split(',').map(id => id);
    const updatedLearningOutcome = await Promise.all(idArray.map(id => this.learningOutcomeService.update(
      +id,
      updateLearningOutcomeDto,
    )));
    this.eventsGateWay.server.emit(
      'updatedLearningOutcome',
      updatedLearningOutcome,
    );
    return updatedLearningOutcome;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.learningOutcomeService.delete(+id);
  }
}
