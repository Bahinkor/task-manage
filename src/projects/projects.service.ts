import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { Project } from "./entities/project.entity";
import ProjectStatusEnum from "./enums/projectStatus.enum";

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    try {
      const newProject = this.projectRepository.create(createProjectDto);
      return await this.projectRepository.save(newProject);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  findAll(status?: ProjectStatusEnum, limit: number = 10, page: number = 1): Promise<Project[]> {
    const query = this.projectRepository.createQueryBuilder("projects");

    if (status === ProjectStatusEnum.Enable || status === ProjectStatusEnum.Disable) {
      query.where("status = :status", { status });
    }

    // pagination
    query.skip((page - 1) * limit).take(limit);

    return query.getMany();
  }

  async findOne(id: number): Promise<Project> {
    const project = await this.projectRepository.findOneBy({ id });

    if (!project) throw new NotFoundException(`project ${id} is not found.`);

    return project;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto): Promise<object> {
    try {
      const project = await this.projectRepository.findOneBy({ id });

      if (!project) throw new NotFoundException(`project ${id} is not found.`);

      const updateProject = await this.projectRepository.update({ id }, updateProjectDto);

      return updateProject;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
