import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { Optional } from 'sequelize/types';

interface FantasyTeamAttributes {
  id: number;
  teamName: string;
  teamId: number;
  leagueId: string;
  isFavorite: boolean;
}

export interface FantasyTeamInput extends Optional<FantasyTeamAttributes, 'id'> {}
export interface FantasyTeamOutput extends Required<FantasyTeamAttributes> {}
export type FantasyTeam = FantasyTeamAttributes;

@Table
export class Team extends Model<FantasyTeamOutput, FantasyTeamInput> implements FantasyTeamAttributes {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column(DataType.STRING)
  teamName: string;

  @Column(DataType.INTEGER)
  teamId: number;

  @Column(DataType.STRING)
  leagueId: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isFavorite: boolean;
}
