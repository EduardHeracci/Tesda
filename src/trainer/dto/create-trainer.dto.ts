import { IsOptional } from 'class-validator';

export class CreateTrainerDto {
  @IsOptional()
  firstName: string;

  @IsOptional()
  middleName: string;

  @IsOptional()
  lastName: string;

  @IsOptional()
  suffix: string;

  @IsOptional()
  gender: string;

  @IsOptional()
  birthDate: string;

  @IsOptional()
  qualification: string[];

  @IsOptional()
  username: string;

  @IsOptional()
  password: string;

  @IsOptional()
  role: string;

  @IsOptional()
  isActive: boolean;
}
