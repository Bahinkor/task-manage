import { IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

import ProjectStatusEnum from "../enums/projectStatus.enum";

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  title: string;

  @IsEnum(ProjectStatusEnum)
  @IsOptional()
  status: ProjectStatusEnum;
}
