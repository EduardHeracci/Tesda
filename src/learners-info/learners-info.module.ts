import { Module } from '@nestjs/common';
import { LearnersInfoService } from './learners-info.service';
import { LearnersInfoController } from './learners-info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LearnersInfo } from './entities/learners-info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LearnersInfo])],
  controllers: [LearnersInfoController],
  providers: [LearnersInfoService],
})
export class LearnersInfoModule {}
