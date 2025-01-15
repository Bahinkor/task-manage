import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, Res } from "@nestjs/common";
import { Response } from "express";

import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import TaskStatusEnum from "./enums/taskStatus.enum";
import { TasksService } from "./tasks.service";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Res() res: Response): Promise<object> {
    const createdTask = await this.tasksService.create(createTaskDto);

    return res.status(HttpStatus.CREATED).json({
      data: createdTask,
      statusCode: HttpStatus.CREATED,
      message: "Task created successfully",
    });
  }

  @Get()
  async findAll(
    @Res() res: Response,
    @Query("status") status?: TaskStatusEnum,
    @Query("limit") limit: number = 10,
    @Query("page") page: number = 1,
  ): Promise<object> {
    const tasks = await this.tasksService.findAll(status, limit, page);

    return res.status(HttpStatus.OK).json({
      data: tasks,
      statusCode: HttpStatus.OK,
      message: "Tasks fetched successfully",
    });
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.tasksService.remove(+id);
  }
}
