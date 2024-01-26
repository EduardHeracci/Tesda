import { IsOptional } from 'class-validator';
import { Qualification } from '@/qualification/entities/qualification.entity';
import { Scholarship } from '@/scholarship/entities/scholarship.entity';
import { Trainer } from '@/trainer/entities/trainer.entity';
import { LearnersInfo } from '@/learners-info/entities/learners-info.entity';

export class CreateTrainingDurationDto {
  @IsOptional()
  dateStart: string;

  @IsOptional()
  dateEnd: string;

  @IsOptional()
  trainer: Trainer;

  @IsOptional()
  scholarship: Scholarship;

  @IsOptional()
  qualification: Qualification;

  @IsOptional()
  learnersInfo: LearnersInfo[];
}
