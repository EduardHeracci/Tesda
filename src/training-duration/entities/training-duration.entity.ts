import { LearnersInfo } from '@/learners-info/entities/learners-info.entity';
import { Qualification } from '@/qualification/entities/qualification.entity';
import { Scholarship } from '@/scholarship/entities/scholarship.entity';
import { Trainer } from '@/trainer/entities/trainer.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

@Entity()
export class TrainingDuration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dateStart: string;

  @Column()
  dateEnd: string;

  @ManyToOne(() => Trainer, (trainer) => trainer.trainingDuration)
  trainer: Relation<Trainer>;

  @ManyToOne(() => Scholarship, (scholarship) => scholarship.trainingDuration)
  scholarship: Scholarship;

  @ManyToOne(
    () => Qualification,
    (qualification) => qualification.trainingDuration,
  )
  qualification: Qualification;

  @JoinTable()
  @ManyToMany(
    () => LearnersInfo,
    (learnersInfo) => learnersInfo.trainingDuration,
  )
  learnersInfo: LearnersInfo[];
}
