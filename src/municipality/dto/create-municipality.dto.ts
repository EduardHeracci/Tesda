import { IsOptional } from 'class-validator';

export class CreateMunicipalityDto {
  @IsOptional()
  name: string;

  @IsOptional()
  province: string;
}
