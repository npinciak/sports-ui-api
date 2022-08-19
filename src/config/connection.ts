import { Sequelize } from 'sequelize-typescript';
import { League } from '../models/league.model';
import { Team } from '../models/team.model';

const sequelize = new Sequelize('db', '', null, {
  logging: false,
  dialect: 'sqlite',
  storage: './database.sqlite',
  models: [Team, League],
});

export default sequelize;
