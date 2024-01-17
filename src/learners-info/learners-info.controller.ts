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
import { LearnersInfoService } from './learners-info.service';
import { CreateLearnersInfoDto } from './dto/create-learners-info.dto';
import { UpdateLearnersInfoDto } from './dto/update-learners-info.dto';
import { EventsGateWay } from '@/security/resources/events/event.gateway';
import { FileInterceptor } from '@nestjs/platform-express';
import xlsx from 'xlsx';
import { LearnerInfoDataRow } from '@/security/resources/interface';
import { LearnersInfo } from './entities/learners-info.entity';

@Controller('learners-info')
export class LearnersInfoController {
  constructor(
    private readonly learnersInfoService: LearnersInfoService,
    private readonly eventsGateWay: EventsGateWay,
  ) { }

  @Post()
  async create(@Body() createLearnersInfoDto: CreateLearnersInfoDto): Promise<LearnersInfo> {
    const createdLearnersInfo = await this.learnersInfoService.create(
      createLearnersInfoDto,
    );
    this.eventsGateWay.server.emit('createdLearnersInfo', createdLearnersInfo);
    return createdLearnersInfo;
  }

  // @Post('file')
  // @UseInterceptors(FileInterceptor('file'))
  // uploadFile(
  //   @Body() createLearnersInfoDto: CreateLearnersInfoDto,
  //   @UploadedFile() file: Express.Multer.File,
  // ) {
  //   return {
  //     createLearnersInfoDto,
  //     file: file.buffer.toString(),
  //   };
  // }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async createUsingExcel(@UploadedFile() file: Express.Multer.File): Promise<LearnersInfo[]> {
    const workbook = xlsx.read(file.buffer, { type: 'buffer' });

    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    const data: LearnerInfoDataRow[] = xlsx.utils.sheet_to_json(worksheet, { header: 1, range: 1 });
    const createdLearnersInfo =
      await this.learnersInfoService.createUsingExcel(data);
    this.eventsGateWay.server.emit('createdExcelLearnersInfo', createdLearnersInfo);
    return createdLearnersInfo;
  }

  // @Get()
  // async findAll(
  //   @Query('isActive') isActive?: string,
  //   @Query('limit') limit?: number,
  //   @Query('offset') offset?: number,
  // ) {
  //   return await this.learnersInfoService.findAll(isActive, limit, offset);
  // }

  @Get()
  async findAll(@Query('isActive') isActive?: string): Promise<{ results: LearnersInfo[]; total: number }> {
    return await this.learnersInfoService.findAll(isActive);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<LearnersInfo> {
    return await this.learnersInfoService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLearnersInfoDto: UpdateLearnersInfoDto,
  ): Promise<void> {
    const updatedLearnersInfo = await this.learnersInfoService.update(
      +id,
      updateLearnersInfoDto,
    );
    this.eventsGateWay.server.emit('updatedLearnersInfo', updatedLearnersInfo);
    return updatedLearnersInfo;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.learnersInfoService.delete(+id);
  }
}
