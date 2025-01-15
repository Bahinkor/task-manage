import { IsString, MinLength } from "class-validator";
// eslint-disable-next-line import/no-cycle
import { Project } from "src/projects/entities/project.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import TaskStatusEnum from "../enums/taskStatus.enum";

@Entity({ name: "tasks" })
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @MinLength(1)
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: "enum", enum: TaskStatusEnum, default: TaskStatusEnum.Set })
  status: TaskStatusEnum;

  @ManyToOne(() => Project, (project) => project.tasks)
  project: Project;
}
