import { ItemEntity } from '../entities/item.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly repository: Repository<CategoryEntity>,
  ) {}
  create(entity): Promise<CategoryEntity> {
    return this.repository.save(entity);
  }

  findAll(): Promise<CategoryEntity[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<CategoryEntity> {
    return this.repository.findOne({ where: { id: id } });
  }

  async update(id: number, entity): Promise<CategoryEntity> {
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

  async getWhereSeverity(severity: string): Promise<any> {
    return this.repository
      .createQueryBuilder('category_entity')
      .where('category_entity.severity like :severity', { severity: severity })
      .getMany();
  }
}
