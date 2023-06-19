import { TrainingDuration } from 'src/training-duration/entities/training-duration.entity';
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
  lastName: string;

  @Column()
  qualification: string;

  @Column()
  userName: string;

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
