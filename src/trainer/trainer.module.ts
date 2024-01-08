import { Module } from '@nestjs/common';
import { TrainerService } from './trainer.service';
import { TrainerController } from './trainer.controller';
import { Trainer } from './entities/trainer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashingService } from '@/security/resources/hashing.service';
import { BcryptService } from '@/security/resources/bcrypt.service';
import { EventsModule } from '@/security/resources/events/event.module';

@Module({
  imports: [EventsModule, TypeOrmModule.forFeature([Trainer])],
  controllers: [TrainerController],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    TrainerService,
  ],
  exports: [TrainerService],
})
export class TrainerModule {}
