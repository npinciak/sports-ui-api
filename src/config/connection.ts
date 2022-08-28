import { Sequelize } from 'sequelize-typescript';
import { League } from '../models/league.model';
import { Team } from '../models/team.model';
import * as dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.JAWSDB_URL, {
  logging: false,
  dialect: 'mysql',

  models: [Team, League],
});

export default sequelize;
