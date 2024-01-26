import { Municipality } from '@/municipality/entities/municipality.entity';
import { TrainingDuration } from '@/training-duration/entities/training-duration.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class LearnersInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  middleName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  suffix: string;

  @Column({ type: 'date' })
  birthDate: Date;

  @Column()
  gender: string;

  @Column()
  phoneNumber: string;

  @Column()
  address: string;

  @ManyToOne(() => Municipality, (municipality) => municipality.learnersInfo)
  municipality: Municipality;

  @Column({ default: true })
  isActive: boolean;

  @ManyToMany(
    () => TrainingDuration,
    (trainingDuration) => trainingDuration.learnersInfo,
  )
  trainingDuration: TrainingDuration[];
}
