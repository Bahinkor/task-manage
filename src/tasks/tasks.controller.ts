import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res } from "@nestjs/common";
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
    @Query("project") projectId?: number,
    @Query("limit") limit: number = 10,
    @Query("page") page: number = 1,
  ): Promise<object> {
    const tasks = await this.tasksService.findAll(status, projectId, limit, page);

    return res.status(HttpStatus.OK).json({
      data: tasks,
      statusCode: HttpStatus.OK,
      message: "Tasks fetched successfully",
    });
  }

  @Get(":id")
  async findOne(@Param("id") id: string, @Res() res: Response): Promise<object> {
    const task = await this.tasksService.findOne(+id);

    return res.status(HttpStatus.OK).json({
      data: task,
      statusCode: HttpStatus.OK,
      message: "Task fetched successfully",
    });
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() updateTaskDto: UpdateTaskDto, @Res() res: Response): Promise<object> {
    await this.tasksService.update(+id, updateTaskDto);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: "Task updated successfully",
    });
  }

  @Delete(":id")
  async remove(@Param("id") id: string, @Res() res: Response): Promise<object> {
    await this.tasksService.remove(+id);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: "Task deleted successfully",
    });
  }
}
