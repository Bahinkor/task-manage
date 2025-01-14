import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";

import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import ProjectStatusEnum from "./enums/projectStatus.enum";
import { ProjectsService } from "./projects.service";

@Controller("projects")
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto): object {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  findAll(
    @Query("status") status?: ProjectStatusEnum,
    @Query("limit") limit: number = 10,
    @Query("page") page: number = 1,
  ) {
    return this.projectsService.findAll(status, limit, page);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.projectsService.findOne(+id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.projectsService.remove(+id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto);
  }
}
