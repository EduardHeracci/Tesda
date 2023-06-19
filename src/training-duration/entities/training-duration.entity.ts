import { LearnersRecord } from 'src/learners-record/entities/learners-record.entity';
import { Qualification } from 'src/qualification/entities/qualification.entity';
import { Scholarship } from 'src/scholarship/entities/scholarship.entity';
import { Trainer } from 'src/trainer/entities/trainer.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
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
  trainer: Trainer;

  @ManyToOne(() => Scholarship, (scholarship) => scholarship.trainingDuration)
  scholarship: Scholarship;

  @ManyToOne(
    () => Qualification,
    (qualification) => qualification.trainingDuration,
  )
  qualification: Qualification;

  @OneToMany(
    () => LearnersRecord,
    (learnersRecord) => learnersRecord.trainingDuration,
  )
  learnersRecord: LearnersRecord[];
}
