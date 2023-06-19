import { Module } from '@nestjs/common';
import { TrainingDurationService } from './training-duration.service';
import { TrainingDurationController } from './training-duration.controller';
import { TrainingDuration } from './entities/training-duration.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TrainingDuration])],
  controllers: [TrainingDurationController],
  providers: [TrainingDurationService],
})
export class TrainingDurationModule {}
