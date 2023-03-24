import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ItemsService } from "../services/items.service";
import { ItemEntity } from "../entities/item.entity";
import { CreateItemDto } from "../dto/create-item.dto";
import { UpdateItemDto } from "../dto/update-item.dto";

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.itemsService.findOne(id);
  }

  @Post()
  addItem(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);}

  @Patch(':id')
  updateItem(@Param('id') id: number, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(id, updateItemDto);
  }
}
