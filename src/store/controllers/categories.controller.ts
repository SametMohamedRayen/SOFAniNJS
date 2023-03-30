import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.categoriesService.findOne(id);
  }

  @Post()
  addCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Patch(':id')
  updateCategory(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Get('/severity/:severity')
  getCategoryBySeverity(@Param('severity') severity: string) {
    return this.categoriesService.getWhereSeverity(
      severity[0].toUpperCase() + severity.substring(1),
    );
  }
}
