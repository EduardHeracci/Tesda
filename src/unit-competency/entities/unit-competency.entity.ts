import { LearningOutcome } from 'src/learning-outcome/entities/learning-outcome.entity';
import { LevelCompetency } from 'src/level-competency/entities/level-competency.entity';
import { NationalCertificateLevel } from 'src/national-certificate-level/entities/national-certificate-level.entity';
import { Qualification } from 'src/qualification/entities/qualification.entity';
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
