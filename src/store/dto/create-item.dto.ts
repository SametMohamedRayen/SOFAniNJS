import {
  IsBoolean,
  IsDecimal,
  IsNotEmpty,
  IsOptional,
  Length,
  MaxLength,
} from 'class-validator';
import { CategoriesEnum } from '../enums/categories.enum';
import { StoreEntity } from '../entities/store.entity';

export class CreateItemDto {
  @IsNotEmpty()
  @Length(8, 50)
  inStoreReference: string;
  @IsNotEmpty()
  @MaxLength(50)
  name: string;
  @IsNotEmpty()
  @IsDecimal()
  price: number;
  @IsNotEmpty()
  category: CategoriesEnum;
  @IsOptional()
  description: string;
  @IsOptional()
  @IsBoolean()
  availability: boolean;
  @IsNotEmpty()
  meshBLOB: string;
  @IsNotEmpty()
  imageBLOB: string;
  @IsNotEmpty()
  store: StoreEntity;
}
