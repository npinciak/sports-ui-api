import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { Optional } from 'sequelize/types';

interface FantasyLeagueAttributes {
  id: number;
  leagueName: string;
  leagueId: string;
  leagueSport: FantasySports;
  leagueYear: string;
}

export interface FantasyLeagueInput extends Optional<FantasyLeagueAttributes, 'id'> {}
export interface FantasyLeagueOutput extends Required<FantasyLeagueAttributes> {}
export type FantasyLeague = FantasyLeagueAttributes;

export enum FantasySports {
  baseball = 'flb',
  football = 'ffl',
  basketball = 'fba',
  hockey = 'fhl',
}

const FantasySportsList = [FantasySports.baseball, FantasySports.football, FantasySports.basketball, FantasySports.hockey];

@Table
export class League extends Model<FantasyLeagueAttributes, FantasyLeagueInput> implements FantasyLeagueAttributes {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column(DataType.STRING)
  leagueName: string;

  @Column(DataType.STRING)
  leagueId: string;

  @Column(DataType.STRING)
  leagueYear: string;

  @Column(DataType.ENUM({ values: FantasySportsList }))
  leagueSport: FantasySports;
}
