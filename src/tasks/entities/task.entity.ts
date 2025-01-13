// eslint-disable-next-line import/no-cycle
import { Project } from "src/projects/entities/project.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

  // eslint-disable-next-line perfectionist/sort-classes
  @ManyToOne(() => Project, (project) => project.tasks)
  project: Project;
}
