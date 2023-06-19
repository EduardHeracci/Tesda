import { PartialType } from '@nestjs/swagger';
import { CreateLearnersRecordDto } from './create-learners-record.dto';

export class UpdateLearnersRecordDto extends PartialType(CreateLearnersRecordDto) {}
