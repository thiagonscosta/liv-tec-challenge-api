import { List } from 'src/list/entities/list.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne('List', (list: List) => list.tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'list_id' })
  list: List;
}
