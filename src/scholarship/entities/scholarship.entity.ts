import { TrainingDuration } from '@/training-duration/entities/training-duration.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Scholarship {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  abbreviation: string;

  @OneToMany(
    () => TrainingDuration,
    (trainingDuration) => trainingDuration.scholarship,
  )
  trainingDuration: TrainingDuration[];
}
