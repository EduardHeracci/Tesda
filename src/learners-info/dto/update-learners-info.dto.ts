import { PartialType } from '@nestjs/swagger';
import { CreateLearnersInfoDto } from './create-learners-info.dto';

export class UpdateLearnersInfoDto extends PartialType(CreateLearnersInfoDto) {}
