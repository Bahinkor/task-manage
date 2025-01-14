import { IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";

import ProjectStatusEnum from "../enums/projectStatus.enum";

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  title: string;

  @IsEnum(ProjectStatusEnum)
  status: ProjectStatusEnum;
}
