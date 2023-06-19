import { LevelCompetency } from 'src/level-competency/entities/level-competency.entity';
import { NationalCertificateLevel } from 'src/national-certificate-level/entities/national-certificate-level.entity';
import { TrainingDuration } from 'src/training-duration/entities/training-duration.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Qualification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  abbreviation: string;

  @ManyToOne(
    () => NationalCertificateLevel,
    (nationalCertificateLevel) => nationalCertificateLevel.qualification,
  )
  nationalCertificateLevel: NationalCertificateLevel;

  @ManyToOne(
    () => LevelCompetency,
    (levelCompetency) => levelCompetency.qualification,
  )
  levelCompetency: LevelCompetency;

  @OneToMany(
    () => TrainingDuration,
    (trainingDuration) => trainingDuration.qualification,
  )
  trainingDuration: TrainingDuration[];
}
