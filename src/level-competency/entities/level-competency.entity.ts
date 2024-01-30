import { Qualification } from '@/qualification/entities/qualification.entity';
import { UnitCompetency } from '@/unit-competency/entities/unit-competency.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class LevelCompetency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(
    () => UnitCompetency,
    (unitCompetency) => unitCompetency.levelCompetency,
  )
  unitCompetency: UnitCompetency;

  @OneToMany(
    () => Qualification,
    (qualification) => qualification.levelCompetency,
  )
  qualification: Qualification[];
}
