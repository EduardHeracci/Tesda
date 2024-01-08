import { Module } from '@nestjs/common';
import { UnitCompetencyService } from './unit-competency.service';
import { UnitCompetencyController } from './unit-competency.controller';
import { UnitCompetency } from './entities/unit-competency.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from '@/security/resources/events/event.module';

@Module({
  imports: [EventsModule, TypeOrmModule.forFeature([UnitCompetency])],
  controllers: [UnitCompetencyController],
  providers: [UnitCompetencyService],
})
export class UnitCompetencyModule {}
