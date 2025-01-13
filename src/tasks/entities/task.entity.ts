import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import TaskStatusEnum from "../enums/taskStatus.enum";

@Entity({ name: "tasks" })
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  // eslint-disable-next-line perfectionist/sort-classes
  @Column()
  description: string;

  @Column({ type: "enum", enum: TaskStatusEnum, default: TaskStatusEnum.Set })
  status: TaskStatusEnum;
}
