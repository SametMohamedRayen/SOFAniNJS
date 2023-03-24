import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntity } from '../../generics/timestamp.entity';
import { ItemEntity } from './item.entity';

@Entity()
export class StoreEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 50 })
  name: string;
  @OneToMany(() => ItemEntity, (item: ItemEntity) => item.store)
  items: ItemEntity[];
}
