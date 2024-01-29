import { UnitCompetency } from '@/unit-competency/entities/unit-competency.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

@Entity()
export class LearningOutcome {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  taskRequired: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(
    () => UnitCompetency,
    (unitCompetency) => unitCompetency.learningOutcome,
  )
  unitCompetency: Relation<UnitCompetency>;
}
