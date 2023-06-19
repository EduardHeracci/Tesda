import { LearnersInfo } from 'src/learners-info/entities/learners-info.entity';
import { TrainingDuration } from 'src/training-duration/entities/training-duration.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
  trainingDuration: TrainingDuration;
}
