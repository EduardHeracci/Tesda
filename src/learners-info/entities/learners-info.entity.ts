import { LearnersRecord } from '@/learners-record/entities/learners-record.entity';
import { Municipality } from '@/municipality/entities/municipality.entity';
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

  @Column({ nullable: true })
  middleName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  suffix: string;

  @Column({ type: 'date' })
  birthDate: Date;

  @Column()
  gender: string;

  @Column()
  phoneNumber: string;

  @Column()
  address: string;

  @ManyToOne(() => Municipality, (municipality) => municipality.learnersInfo)
  municipality: Municipality;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(
    () => LearnersRecord,
    (learnersRecord) => learnersRecord.learnersInfo,
  )
  learnersRecord: LearnersRecord[];
}
