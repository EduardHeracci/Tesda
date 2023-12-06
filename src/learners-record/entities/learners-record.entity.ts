import { LearnersInfo } from '@/learners-info/entities/learners-info.entity';
import { TrainingDuration } from '@/training-duration/entities/training-duration.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

@Entity()
export class LearnersRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dateStart: string;

  @Column()
  dateAccomplished: string;

  @Column()
  remarks: string;

  @ManyToOne(() => LearnersInfo, (learnersInfo) => learnersInfo.learnersRecord)
  learnersInfo: LearnersInfo;

  @ManyToOne(
    () => TrainingDuration,
    (trainingDuration) => trainingDuration.learnersRecord,
  )
  trainingDuration: Relation<TrainingDuration>;
}
