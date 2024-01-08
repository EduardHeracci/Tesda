import { Module } from '@nestjs/common';
import { MunicipalityService } from './municipality.service';
import { MunicipalityController } from './municipality.controller';
import { Municipality } from './entities/municipality.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from '@/security/resources/events/event.module';

@Module({
  imports: [EventsModule, TypeOrmModule.forFeature([Municipality])],
  controllers: [MunicipalityController],
  providers: [MunicipalityService],
})
export class MunicipalityModule {}
