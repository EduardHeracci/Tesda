import { IsOptional } from 'class-validator';
import { Municipality } from 'src/municipality/entities/municipality.entity';

export class CreateLearnersInfoDto {
  @IsOptional()
  firstName: string;

  @IsOptional()
  middleName: string;

  @IsOptional()
  lastName: string;

  @IsOptional()
  birthDate: string;

  @IsOptional()
  gender: string;

  @IsOptional()
  phoneNumber: string;

  @IsOptional()
  address: string;

  @IsOptional()
  municipality: Municipality;
}
