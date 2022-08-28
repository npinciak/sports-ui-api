import { Table, Index, Column, Model, DataType } from 'sequelize-typescript';

export interface FantasyLeague {
  id: number;
  leagueName: string;
  leagueId: string;
  leagueSport: FantasySports;
}

export enum FantasySports {
  baseball = 'flb',
  football = 'ffl',
  basketball = 'fba',
  hockey = 'fhl',
}

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

  @Column(DataType.STRING)
  leagueId: string;

  @Column(
    DataType.ENUM({
      values: [FantasySports.baseball, FantasySports.football, FantasySports.basketball, FantasySports.hockey],
    })
  )
  leagueSport: FantasySports;
}
