import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Project } from "src/projects/entities/project.entity";
import { Repository } from "typeorm";

import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task } from "./entities/task.entity";
import TaskStatusEnum from "./enums/taskStatus.enum";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
    @InjectRepository(Project) private readonly projectRepository: Repository<Project>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      const { projectId, ...taskData } = createTaskDto;

      const project = await this.projectRepository.findOneByOrFail({ id: projectId });
      const createdTask = this.taskRepository.create({ ...taskData, project });

      return await this.taskRepository.save(createdTask);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  findAll(status?: TaskStatusEnum, limit: number = 10, page: number = 1): Promise<Task[]> {
    const query = this.taskRepository.createQueryBuilder("tasks").leftJoinAndSelect("tasks.project", "project");

    if (
      status === TaskStatusEnum.Set ||
      status === TaskStatusEnum.Doing ||
      status === TaskStatusEnum.Done ||
      status === TaskStatusEnum.Cancel
    ) {
      query.where("tasks.status = :status", { status });
    }

    // pagination
    query.skip((page - 1) * limit).take(limit);

    return query.getMany();
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id }, relations: ["project"] });

    if (!task) throw new NotFoundException(`Task ${id} is not found.`);

    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<object> {
    try {
      const { projectId, ...taskData } = updateTaskDto;
      const task = await this.taskRepository.findOneBy({ id });

      if (!task) throw new NotFoundException(`Task ${id} is not found.`);

      const project = await this.projectRepository.findOneByOrFail({ id: projectId });

      const updatedTask = await this.taskRepository.update({ id }, { ...taskData, project });

      return updatedTask;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async remove(id: number): Promise<void> {
    const deletedTask = await this.taskRepository.delete({ id });

    if (!deletedTask.affected) throw new NotFoundException(`Task ${id} is not found.`);
  }
}
