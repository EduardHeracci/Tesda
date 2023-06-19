import { IsOptional } from 'class-validator';

export class CreateLearningOutcomeDto {
  @IsOptional()
  name: string;

  @IsOptional()
  taskRequired: string;
}
