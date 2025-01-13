import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import StatusEnum from "../enums/status.enum";

@Entity({ name: "projects" })
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: StatusEnum, default: StatusEnum.Enable })
  status: StatusEnum;

  @Column()
  title: string;
}
