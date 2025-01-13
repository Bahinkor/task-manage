import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "projects" })
export class Project {
  @PrimaryGeneratedColumn()
  id: number;
}
