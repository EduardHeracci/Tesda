import { LearningOutcome } from '@/learning-outcome/entities/learning-outcome.entity';
import { LevelCompetency } from '@/level-competency/entities/level-competency.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class UnitCompetency {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @ManyToOne(
    () => LearningOutcome,
    (learningOutcome) => learningOutcome.unitCompetency,
  )
  learningOutcome: LearningOutcome;

  @OneToMany(
    () => LevelCompetency,
    (levelCompetency) => levelCompetency.unitCompetency,
  )
  levelCompetency: LevelCompetency[];
}