import { UnitCompetency } from '@/unit-competency/entities/unit-competency.entity';
import { IsOptional } from 'class-validator';

export class CreateLearningOutcomeDto {
  @IsOptional()
  name: string;

  @IsOptional()
  taskRequired: string;

  @IsOptional()
  unitCompetency: UnitCompetency;
}
