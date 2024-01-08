import { Module } from '@nestjs/common';
import { NationalCertificateLevelService } from './national-certificate-level.service';
import { NationalCertificateLevelController } from './national-certificate-level.controller';
import { NationalCertificateLevel } from './entities/national-certificate-level.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from '@/security/resources/events/event.module';

@Module({
  imports: [EventsModule, TypeOrmModule.forFeature([NationalCertificateLevel])],
  controllers: [NationalCertificateLevelController],
  providers: [NationalCertificateLevelService],
})
export class NationalCertificateLevelModule {}
