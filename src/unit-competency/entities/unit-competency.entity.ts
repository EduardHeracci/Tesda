import { LearningOutcome } from '@/learning-outcome/entities/learning-outcome.entity';
import { LevelCompetency } from '@/level-competency/entities/level-competency.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

@Entity()
export class UnitCompetency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  unitCompetencyCode: string;

  @Column()
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(
    () => LearningOutcome,
    (learningOutcome) => learningOutcome.unitCompetency,
  )
  learningOutcome: LearningOutcome[];

  @ManyToOne(
    () => LevelCompetency,
    (levelCompetency) => levelCompetency.unitCompetency,
  )
  levelCompetency: Relation<LevelCompetency>;
}
