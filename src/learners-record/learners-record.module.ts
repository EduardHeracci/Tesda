import { Module } from '@nestjs/common';
import { LearnersRecordService } from './learners-record.service';
import { LearnersRecordController } from './learners-record.controller';
import { LearnersRecord } from './entities/learners-record.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from '@/security/resources/events/event.module';

@Module({
  imports: [EventsModule, TypeOrmModule.forFeature([LearnersRecord])],
  controllers: [LearnersRecordController],
  providers: [LearnersRecordService],
})
export class LearnersRecordModule {}
