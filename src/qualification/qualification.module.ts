import { Module } from '@nestjs/common';
import { QualificationService } from './qualification.service';
import { QualificationController } from './qualification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Qualification } from './entities/qualification.entity';
import { EventsModule } from '@/security/resources/events/event.module';

@Module({
  imports: [EventsModule, TypeOrmModule.forFeature([Qualification])],
  controllers: [QualificationController],
  providers: [QualificationService],
})
export class QualificationModule {}
