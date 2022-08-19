import { Table, Index, Column, Model, DataType } from 'sequelize-typescript';

const { STRING, TEXT, INTEGER, BIGINT } = DataType;

@Table
export class Team extends Model<FantasyTeam> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    comment: 'user id',
  })
  id: number;

  @Column(DataType.STRING)
  teamName: string;

  @Column(DataType.INTEGER)
  teamId: number;

  @Column(DataType.BIGINT)
  leagueId: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isFavorite: boolean;
}

export interface FantasyTeam {
  id: number;
  teamName: string;
  teamId: number;
  leagueId: number;
  isFavorite: boolean;
}
