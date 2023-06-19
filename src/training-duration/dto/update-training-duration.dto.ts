import { PartialType } from '@nestjs/swagger';
import { CreateTrainingDurationDto } from './create-training-duration.dto';

export class UpdateTrainingDurationDto extends PartialType(CreateTrainingDurationDto) {}
