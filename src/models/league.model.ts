import { Table, Index, Column, Model, DataType } from 'sequelize-typescript';

const { STRING, TEXT, INTEGER, BIGINT } = DataType;

@Table
export class League extends Model<FantasyLeague> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    comment: 'id',
  })
  id: number;

  @Column(DataType.STRING)
  leagueName: string;

  @Column(DataType.BIGINT)
  leagueId: number;

  @Column(DataType.STRING)
  leagueSport: string;
}

export interface FantasyLeague {
  id: number;
  leagueName: string;
  leagueId: number;
  leagueSport: string;
}
