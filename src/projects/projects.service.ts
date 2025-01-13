import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { Project } from "./entities/project.entity";
import ProjectStatusEnum from "./enums/projectStatus.enum";
import { log } from "console";

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

  findAll(status?: ProjectStatusEnum): Promise<Project[]> {
    const query = this.projectRepository.createQueryBuilder("projects");

    if (status === ProjectStatusEnum.Enable || status === ProjectStatusEnum.Disable) {
      query.where("status = :status", { status });
    }

    return query.getMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
