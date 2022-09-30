import { Sequelize } from 'sequelize-typescript';
import * as dotenv from 'dotenv';
import { DfsPlayerAttr } from '../api/models/dfs-player-attributes.model';
import { DfsPlayer } from '../api/models/dfs-player.model';
import { League } from '../api/models/league.model';
import { Team } from '../api/models/team.model';
import { User } from '../api/models/user.model';

dotenv.config();

const sequelize = new Sequelize(process.env.JAWSDB_URL, {
  logging: true,
  dialect: 'mysql',
  models: [Team, League, User, DfsPlayer, DfsPlayerAttr],
});

export default sequelize;
