import type ProjectStatusEnum from "../enums/projectStatus.enum";

export class CreateProjectDto {
  title: string;
  // eslint-disable-next-line perfectionist/sort-classes
  status: ProjectStatusEnum;
}
