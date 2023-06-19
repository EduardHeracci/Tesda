import { IsOptional } from 'class-validator';
import { LearnersInfo } from 'src/learners-info/entities/learners-info.entity';
import { TrainingDuration } from 'src/training-duration/entities/training-duration.entity';

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
