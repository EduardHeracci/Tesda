import { Module } from '@nestjs/common';
import { EventsGateWay } from './event.gateway';

@Module({
  providers: [EventsGateWay],
  exports: [EventsGateWay],
})
export class EventsModule {}
