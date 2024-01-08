import { IsOptional } from 'class-validator';
import { LearningOutcome } from '@/learning-outcome/entities/learning-outcome.entity';
export class CreateUnitCompetencyDto {
  @IsOptional()
  unitCompetencyCode: string;

  @IsOptional()
  name: string;

  @IsOptional()
  learningOutcome: LearningOutcome;
}
