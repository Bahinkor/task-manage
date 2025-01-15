import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ProjectsModule } from "./projects/projects.module";
import { TasksModule } from "./tasks/tasks.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "",
      database: "task_manage",
      entities: [`${__dirname}/**/entities/*.entity{.ts,.js}`],
      synchronize: true,
    }),
    ProjectsModule,
    TasksModule,
  ],
})
export class AppModule {}
