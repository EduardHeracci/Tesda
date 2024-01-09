import { UnitCompetency } from '@/unit-competency/entities/unit-competency.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LearningOutcome {
  @PrimaryGeneratedColumn()
  id: number;

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
