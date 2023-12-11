import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrainerModule } from './trainer/trainer.module';
import { TrainingDurationModule } from './training-duration/training-duration.module';
import { QualificationModule } from './qualification/qualification.module';
import { UnitCompetencyModule } from './unit-competency/unit-competency.module';
import { LevelCompetencyModule } from './level-competency/level-competency.module';
import { NationalCertificateLevelModule } from './national-certificate-level/national-certificate-level.module';
import { LearningOutcomeModule } from './learning-outcome/learning-outcome.module';
import { LearnersRecordModule } from './learners-record/learners-record.module';
import { LearnersInfoModule } from './learners-info/learners-info.module';
import { ScholarshipModule } from './scholarship/scholarship.module';
import { MunicipalityModule } from './municipality/municipality.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './config/database.configuration';
import { AuthenticationModule } from './security/authentication/authentication.module';
import { EventsModule } from './security/resources/events/event.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: DatabaseConfig }),
    TrainerModule,
    TrainingDurationModule,
    QualificationModule,
    UnitCompetencyModule,
    LevelCompetencyModule,
    NationalCertificateLevelModule,
    LearningOutcomeModule,
    LearnersRecordModule,
    LearnersInfoModule,
    ScholarshipModule,
    MunicipalityModule,
    AuthenticationModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
