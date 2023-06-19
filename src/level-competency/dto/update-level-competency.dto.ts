import { PartialType } from '@nestjs/swagger';
import { CreateLevelCompetencyDto } from './create-level-competency.dto';

export class UpdateLevelCompetencyDto extends PartialType(CreateLevelCompetencyDto) {}
