import { Module } from '@nestjs/common';
import { LevelCompetencyService } from './level-competency.service';
import { LevelCompetencyController } from './level-competency.controller';
import { LevelCompetency } from './entities/level-competency.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from '@/security/resources/events/event.module';

@Module({
  imports: [EventsModule, TypeOrmModule.forFeature([LevelCompetency])],
  controllers: [LevelCompetencyController],
  providers: [LevelCompetencyService],
})
export class LevelCompetencyModule { }
