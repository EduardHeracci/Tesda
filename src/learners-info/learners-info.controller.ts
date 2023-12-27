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

@Controller('learners-info')
export class LearnersInfoController {
  constructor(
    private readonly learnersInfoService: LearnersInfoService,
    private readonly eventsGateWay: EventsGateWay,
  ) {}

  @Post()
  async create(@Body() createLearnersInfoDto: CreateLearnersInfoDto) {
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
  async createUsingExcel(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    const workbook = xlsx.read(file.buffer, { type: 'buffer' });

    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    const data = xlsx.utils.sheet_to_json(worksheet, { header: 1, range: 1 });
    const createdLearnersInfo =
      await this.learnersInfoService.createUsingExcel(data);
    this.eventsGateWay.server.emit('createdLearnersInfo', createdLearnersInfo);
    return createdLearnersInfo;
  }

  @Get()
  async findAll(
    @Query('isActive') isActive?: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return await this.learnersInfoService.findAll(isActive, limit, offset);
  }

  @Get('/count')
  async countAll() {
    return await this.learnersInfoService.countAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.learnersInfoService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLearnersInfoDto: UpdateLearnersInfoDto,
  ) {
    const updatedLearnersInfo = await this.learnersInfoService.update(
      +id,
      updateLearnersInfoDto,
    );
    this.eventsGateWay.server.emit('updatedLearnersInfo', updatedLearnersInfo);
    return updatedLearnersInfo;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.learnersInfoService.delete(+id);
  }
}
