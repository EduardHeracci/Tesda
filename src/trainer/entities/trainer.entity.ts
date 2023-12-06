import { TrainingDuration } from '@/training-duration/entities/training-duration.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Trainer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  middleName: string;

  @Column()
  lastname: string;

  @Column()
  qualification: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @OneToMany(
    () => TrainingDuration,
    (trainingDuration) => trainingDuration.trainer,
  )
  trainingDuration: TrainingDuration[];
}
