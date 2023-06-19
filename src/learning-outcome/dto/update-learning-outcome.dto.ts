import { PartialType } from '@nestjs/swagger';
import { CreateLearningOutcomeDto } from './create-learning-outcome.dto';

export class UpdateLearningOutcomeDto extends PartialType(CreateLearningOutcomeDto) {}
