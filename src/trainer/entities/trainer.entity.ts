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
  lastName: string;

  @Column({ nullable: true })
  suffix: string;

  @Column()
  gender: string;

  @Column()
  birthDate: Date;

  @Column()
  qualification: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(
    () => TrainingDuration,
    (trainingDuration) => trainingDuration.trainer,
  )
  trainingDuration: TrainingDuration[];
}
