import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemEntity } from './entities/item.entity';
import { StoreEntity } from './entities/store.entity';
import { ItemsController } from './controllers/items.controller';
import { ItemsService } from './services/items.service';
import { CategoriesService } from './services/categories.service';
import { CategoriesController } from './controllers/categories.controller';
import { CategoryEntity } from './entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemEntity, StoreEntity, CategoryEntity]),
  ],
  controllers: [ItemsController, CategoriesController],
  providers: [ItemsService, CategoriesService],
  exports: [],
})
export class StoreModule {}
