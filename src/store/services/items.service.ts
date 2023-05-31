import { ItemEntity } from '../entities/item.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { In, Repository } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(ItemEntity)
    private readonly repository: Repository<ItemEntity>,
  ) {}
  create(entity): Promise<ItemEntity> {
    return this.repository.save(entity);
  }

  findAll(): Promise<ItemEntity[]> {
    return this.repository.find();
  }

  async findManyByNames(names: string): Promise<any> {
    const arrayOfNames = names.split(',');
    console.log(arrayOfNames);
    return this.repository.find({
      where: { name: In(arrayOfNames) },
    });
  }

  findOne(id: number): Promise<ItemEntity> {
    return this.repository.findOne({ where: { id: id } });
  }

  async update(id: number, entity): Promise<ItemEntity> {
    const newEntity = await this.repository.preload({ id, ...entity });
    if (newEntity) {
      return this.repository.save(newEntity);
    } else {
      throw new NotFoundException(`id ${id} doesn't exist!`);
    }
  }

  async remove(id: number): Promise<any> {
    const deletedResponse = await this.repository.softDelete(id);
    if (!deletedResponse?.affected) {
      throw new NotFoundException();
    }
    return deletedResponse;
  }
  async restore(id: number): Promise<any> {
    const restoreResponse = await this.repository.restore(id);
    if (!restoreResponse?.affected) {
      throw new NotFoundException();
    }
    return restoreResponse;
  }
}
