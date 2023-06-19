import { PartialType } from '@nestjs/swagger';
import { CreateNationalCertificateLevelDto } from './create-national-certificate-level.dto';

export class UpdateNationalCertificateLevelDto extends PartialType(CreateNationalCertificateLevelDto) {}
