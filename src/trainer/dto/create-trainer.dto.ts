import { IsOptional } from 'class-validator';

export class CreateTrainerDto {
  @IsOptional()
  firstName: string;

  @IsOptional()
  middleName: string;

  @IsOptional()
  lastName: string;

  @IsOptional()
  qualification: string;

  @IsOptional()
  userName: string;

  @IsOptional()
  password: string;

  @IsOptional()
  role: string;
}
