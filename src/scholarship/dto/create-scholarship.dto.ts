import { IsOptional } from 'class-validator';

export class CreateScholarshipDto {
  @IsOptional()
  name: string;

  @IsOptional()
  abbreviation: string;
}
