import { Module } from '@nestjs/common';
import { MunicipalityService } from './municipality.service';
import { MunicipalityController } from './municipality.controller';
import { Municipality } from './entities/municipality.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Municipality])],
  controllers: [MunicipalityController],
  providers: [MunicipalityService],
})
export class MunicipalityModule {}
