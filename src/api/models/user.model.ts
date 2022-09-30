import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { Optional } from 'sequelize/types';

interface FantasyUserAttributes {
  id: number;
  user: string;
  espnId: string;
  teamId: string;
  leagueId: string;
}

export interface FantasyUserInput extends Optional<FantasyUserAttributes, 'id'> {}
export interface FantasyUserOutput extends Required<FantasyUserAttributes> {}
export type FantasyUser = FantasyUserAttributes;

@Table
export class User extends Model<FantasyUserOutput, FantasyUserInput> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column(DataType.STRING)
  user: string;

  @Column(DataType.STRING)
  espnId: string;

  @Column(DataType.STRING)
  teamId: string;

  @Column(DataType.STRING)
  leagueId: string;
}
