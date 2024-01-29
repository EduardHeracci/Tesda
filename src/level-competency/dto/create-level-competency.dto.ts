import { IsOptional } from 'class-validator';
// import { UnitCompetency } from '@/unit-competency/entities/unit-competency.entity';

export class CreateLevelCompetencyDto {
  @IsOptional()
  name: string;

  // @IsOptional()
  // unitCompetency: UnitCompetency;
}
