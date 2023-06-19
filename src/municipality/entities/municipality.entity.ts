import { LearnersInfo } from 'src/learners-info/entities/learners-info.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Municipality {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  province: string;

  @OneToMany(() => LearnersInfo, (learnersInfo) => learnersInfo.municipality)
  learnersInfo: LearnersInfo[];
}
