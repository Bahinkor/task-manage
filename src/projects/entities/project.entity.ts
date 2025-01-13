import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import ProjectStatusEnum from "../enums/projectStatus.enum";

@Entity({ name: "projects" })
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  // eslint-disable-next-line perfectionist/sort-classes
  @Column({ type: "enum", enum: ProjectStatusEnum, default: ProjectStatusEnum.Enable })
  status: ProjectStatusEnum;
}
