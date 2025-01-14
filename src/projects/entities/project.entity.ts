import { IsNotEmpty, IsString, MinLength } from "class-validator";
// eslint-disable-next-line import/no-cycle
import { Task } from "src/tasks/entities/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import ProjectStatusEnum from "../enums/projectStatus.enum";

@Entity({ name: "projects" })
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  title: string;

  @Column({ type: "enum", enum: ProjectStatusEnum, default: ProjectStatusEnum.Enable })
  status: ProjectStatusEnum;

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];
}
