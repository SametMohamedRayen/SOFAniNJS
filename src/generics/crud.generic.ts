import { DeepPartial, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CRUDGeneric<T> {
  constructor(private readonly repository: Repository<T>) {}
  create(entity): Promise<T> {
    return this.repository.save(entity);
  }

  findAll(): Promise<T[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<T> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.repositoy.findOne(id);
  }

  async update(id: number, entity): Promise<(DeepPartial<T> & T)[]> {
    const newEntity = await this.repository.preload({ id, ...entity });
    if (newEntity) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return this.repositroy.save(newEntity);
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
