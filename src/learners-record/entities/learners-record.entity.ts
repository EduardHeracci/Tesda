import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LearnersRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dateStart: string;

  @Column()
  dateAccomplished: string;

  @Column()
  remarks: string;

}
