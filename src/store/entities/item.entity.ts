import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntity } from '../../generics/timestamp.entity';
import { CategoriesEnum } from '../enums/categories.enum';
import { StoreEntity } from './store.entity';

@Entity()
export class ItemEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 50 })
  inStoreReference: string;
  @Column({ length: 50, unique: true })
  name: string;
  @Column({ length: 100 })
  description: string;
  @Column()
  category: CategoriesEnum;
  @Column()
  price: number;
  @Column({ default: true })
  availability: boolean;
  @Column('longblob', {
    nullable: false,
    transformer: {
      to: (value: string) => Buffer.from(value),
      from: (value: Buffer) => value.toString(),
    },
  })
  meshBLOB: string;
  @Column('longblob', {
    nullable: false,
    transformer: {
      to: (value: string) => Buffer.from(value),
      from: (value: Buffer) => value.toString(),
    },
  })
  imageBLOB: string;
  @ManyToOne(() => StoreEntity, (store: StoreEntity) => store.items)
  store: StoreEntity;
}
