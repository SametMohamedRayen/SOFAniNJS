import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemEntity } from './entities/item.entity';
import { StoreEntity } from './entities/store.entity';
import { ItemsController } from './controllers/items.controller';
import { ItemsService } from './services/items.service';

@Module({
  imports: [TypeOrmModule.forFeature([ItemEntity, StoreEntity])],
  controllers: [ItemsController],
  providers: [ItemsService],
  exports: [],
})
export class StoreModule {}
