import { Module } from '@nestjs/common';
import { ScholarshipService } from './scholarship.service';
import { ScholarshipController } from './scholarship.controller';
import { Scholarship } from './entities/scholarship.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Scholarship])],
  controllers: [ScholarshipController],
  providers: [ScholarshipService],
})
export class ScholarshipModule {}
