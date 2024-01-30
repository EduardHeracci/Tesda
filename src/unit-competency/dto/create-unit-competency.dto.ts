import { LearningOutcome } from '@/learning-outcome/entities/learning-outcome.entity';
import { IsOptional } from 'class-validator';
export class CreateUnitCompetencyDto {
  @IsOptional()
  unitCompetencyCode: string;

  @IsOptional()
  name: string;

  @IsOptional()
  learningOutcome: LearningOutcome;
}
