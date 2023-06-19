import { Module } from '@nestjs/common';
import { NationalCertificateLevelService } from './national-certificate-level.service';
import { NationalCertificateLevelController } from './national-certificate-level.controller';
import { NationalCertificateLevel } from './entities/national-certificate-level.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([NationalCertificateLevel])],
  controllers: [NationalCertificateLevelController],
  providers: [NationalCertificateLevelService],
})
export class NationalCertificateLevelModule {}
