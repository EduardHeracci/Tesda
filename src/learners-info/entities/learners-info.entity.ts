import { LearnersRecord } from 'src/learners-record/entities/learners-record.entity';
import { Municipality } from 'src/municipality/entities/municipality.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class LearnersInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  middleName: string;

  @Column()
  lastName: string;

  @Column()
  birthDate: string;

  @Column()
  gender: string;

  @Column()
  phoneNumber: string;

  @Column()
  address: string;

  @ManyToOne(() => Municipality, (municipality) => municipality.learnersInfo)
  municipality: Municipality;

  @OneToMany(
    () => LearnersRecord,
    (learnersRecord) => learnersRecord.learnersInfo,
  )
  learnersRecord: LearnersRecord[];
}
