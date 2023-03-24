import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  VersionColumn,
} from 'typeorm';

@Entity()
export class TimestampEntity {
  @CreateDateColumn({
    update: false,
  })
  createdAt: Date;
  @CreateDateColumn({})
  updatedAt: Date;
  @DeleteDateColumn({})
  deletedAt: Date;
  @VersionColumn()
  version: number;
}
