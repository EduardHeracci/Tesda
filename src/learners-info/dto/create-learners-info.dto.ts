import { Municipality } from '@/municipality/entities/municipality.entity';
import { IsOptional } from 'class-validator';

export class CreateLearnersInfoDto {
  @IsOptional()
  firstName: string;

  @IsOptional()
  middleName: string;

  @IsOptional()
  lastName: string;

  @IsOptional()
  suffix: string;

  @IsOptional()
  birthDate: Date;

  @IsOptional()
  gender: string;

  @IsOptional()
  phoneNumber: string;

  @IsOptional()
  address: string;

  @IsOptional()
  municipality: Municipality;

  @IsOptional()
  isActive: boolean;
}
