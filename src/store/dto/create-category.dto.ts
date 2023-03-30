import { IsNotEmpty, IsOptional } from 'class-validator';
import { CategoriesEnum } from '../enums/categories.enum';
import { SeveritiesEnum } from '../enums/severities.enum';

export class CreateCategoryDto {
  @IsNotEmpty()
  label: CategoriesEnum;
  @IsNotEmpty()
  severity: SeveritiesEnum;
  @IsOptional()
  parentCategory: CategoriesEnum;
}
