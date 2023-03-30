import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntity } from '../../generics/timestamp.entity';
import { CategoriesEnum } from '../enums/categories.enum';
import { SeveritiesEnum } from '../enums/severities.enum';
@Entity()
export class CategoryEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  label: CategoriesEnum;
  @Column()
  severity: SeveritiesEnum;
  @Column({ nullable: true })
  @ManyToOne(() => CategoryEntity, (category: CategoryEntity) => category.id)
  parentCategory: CategoriesEnum;
}
