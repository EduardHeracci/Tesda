import { Module } from '@nestjs/common';
import { TrainingDurationService } from './training-duration.service';
import { TrainingDurationController } from './training-duration.controller';
import { TrainingDuration } from './entities/training-duration.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from '@/security/resources/events/event.module';

@Module({
  imports: [EventsModule, TypeOrmModule.forFeature([TrainingDuration])],
  controllers: [TrainingDurationController],
  providers: [TrainingDurationService],
})
export class TrainingDurationModule { }
