import { Module } from '@nestjs/common';
import { LearningOutcomeService } from './learning-outcome.service';
import { LearningOutcomeController } from './learning-outcome.controller';
import { LearningOutcome } from './entities/learning-outcome.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([LearningOutcome])],
  controllers: [LearningOutcomeController],
  providers: [LearningOutcomeService],
})
export class LearningOutcomeModule {}
