import { IsOptional } from 'class-validator';
import { LevelCompetency } from '@/level-competency/entities/level-competency.entity';
import { NationalCertificateLevel } from '@/national-certificate-level/entities/national-certificate-level.entity';

export class CreateQualificationDto {
  @IsOptional()
  name: string;

  @IsOptional()
  abbreviation: string;

  @IsOptional()
  nationalCertificateLevel: NationalCertificateLevel;

  @IsOptional()
  levelCompetency: LevelCompetency;
}
