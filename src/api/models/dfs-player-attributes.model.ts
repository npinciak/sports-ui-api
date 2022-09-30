import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { Optional } from 'sequelize/types';

export interface DfsPlayerAttributes {
  id: number;
  dk_salary: number;
}

export type DfsPlayerAttributesInput = Optional<DfsPlayerAttributes, 'id'>;

@Table
export class DfsPlayerAttr extends Model<DfsPlayerAttributes, DfsPlayerAttributesInput> implements DfsPlayerAttributes {
  @Column({ primaryKey: true })
  id: number;

  @Column(DataType.INTEGER)
  dk_salary: number;
}
