import { Module } from '@nestjs/common';
import { ScholarshipService } from './scholarship.service';
import { ScholarshipController } from './scholarship.controller';
import { Scholarship } from './entities/scholarship.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from '@/security/resources/events/event.module';

@Module({
  imports: [EventsModule, TypeOrmModule.forFeature([Scholarship])],
  controllers: [ScholarshipController],
  providers: [ScholarshipService],
})
export class ScholarshipModule {}
