import { IsOptional } from 'class-validator';
import { LearnersInfo } from '@/learners-info/entities/learners-info.entity';
import { TrainingDuration } from '@/training-duration/entities/training-duration.entity';

export class CreateLearnersRecordDto {
  @IsOptional()
  dateStart: string;

  @IsOptional()
  dateAccomplished: string;

  @IsOptional()
  remarks: string;

  @IsOptional()
  learnersInfo: LearnersInfo;

  @IsOptional()
  trainingDuration: TrainingDuration;
}
