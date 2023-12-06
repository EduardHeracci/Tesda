import { UnitCompetency } from '@/unit-competency/entities/unit-competency.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class LearningOutcome {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  taskRequired: string;

  @OneToMany(
    () => UnitCompetency,
    (unitCompetency) => unitCompetency.learningOutcome,
  )
  unitCompetency: UnitCompetency[];
}
