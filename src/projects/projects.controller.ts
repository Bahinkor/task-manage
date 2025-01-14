import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res } from "@nestjs/common";
import { Response } from "express";

import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import ProjectStatusEnum from "./enums/projectStatus.enum";
import { ProjectsService } from "./projects.service";

@Controller("projects")
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto, @Res() res: Response): Promise<object> {
    const createdProject = await this.projectsService.create(createProjectDto);

    return res.status(HttpStatus.CREATED).json({
      data: createdProject,
      statusCode: HttpStatus.CREATED,
      message: "Project created successfully.",
    });
  }

  @Get()
  async findAll(
    @Res() res: Response,
    @Query("status") status?: ProjectStatusEnum,
    @Query("limit") limit: number = 10,
    @Query("page") page: number = 1,
  ) {
    const projects = await this.projectsService.findAll(status, limit, page);

    return res.status(HttpStatus.OK).json({
      data: projects,
      statusCode: HttpStatus.OK,
      message: "Projects fetched successfully.",
    });
  }

  @Get(":id")
  async findOne(@Param("id") id: string, @Res() res: Response) {
    const project = await this.projectsService.findOne(+id);

    return res.status(HttpStatus.OK).json({
      data: project,
      statusCode: HttpStatus.OK,
      message: "Project fetched successfully.",
    });
  }

  @Delete(":id")
  async remove(@Param("id") id: string, @Res() res: Response) {
    await this.projectsService.remove(+id);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: "Project deleted successfully.",
    });
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() updateProjectDto: UpdateProjectDto, @Res() res: Response) {
    await this.projectsService.update(+id, updateProjectDto);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: "Project updated successfully.",
    });
  }
}
