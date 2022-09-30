import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { Optional } from 'sequelize/types';

interface Player {
  id: number;
  rgId: number;
  name: string;
  teamId: number;
  rgTeamId: number;
  position: string;
}

export type PlayerAttributes = Player;
export type PlayerInput = Optional<PlayerAttributes, 'id'>;

@Table
export class DfsPlayer extends Model<PlayerAttributes, PlayerInput> implements PlayerAttributes {
  @Column({ primaryKey: true })
  id: number;

  @Column(DataType.INTEGER)
  rgId: number;

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.INTEGER)
  teamId: number;

  @Column(DataType.INTEGER)
  rgTeamId: number;

  @Column(DataType.STRING)
  position: string;
}
