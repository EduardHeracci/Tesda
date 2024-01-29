import { LevelCompetency } from '@/level-competency/entities/level-competency.entity';
import { IsOptional } from 'class-validator';
export class CreateUnitCompetencyDto {
  @IsOptional()
  unitCompetencyCode: string;

  @IsOptional()
  name: string;

  @IsOptional()
  levelCompetency: LevelCompetency;
}
