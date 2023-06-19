import { PartialType } from '@nestjs/swagger';
import { CreateUnitCompetencyDto } from './create-unit-competency.dto';

export class UpdateUnitCompetencyDto extends PartialType(CreateUnitCompetencyDto) {}
