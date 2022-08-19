import express, { Express } from 'express';
import { FantasyLeague, League } from './models/league.model';
import sequelize from './config/connection';
import { FantasyTeam, Team } from './models/team.model';
import cors from 'cors';
import bodyParser from 'body-parser';

const app: Express = express();

const PORT = 8080;

app.listen(PORT, async () => {
  console.log(`[⚡️] App is running at http://localhost:${PORT} in ${app.get('env')} mode`);

  await sequelize.authenticate();
});

app.use(cors());
app.use(bodyParser.json());
app.get('/sync-all', async (req, res) => {
  sequelize.sync({ force: true }).then(() => {
    console.log(`Database & tables created!`);

    Team.bulkCreate(MOCK_TEAM_LIST).then(() => Team.findAll().then(user => res.json(user)));
    League.bulkCreate(MOCK_LEAGUE_LIST).then(() => League.findAll().then(l => res.json(l)));
  });
});

const MOCK_TEAM: FantasyTeam = { teamName: 'Seamhead Express', teamId: 2, leagueId: 862104690, isFavorite: true, id: 1 };
const MOCK_TEAM_LIST: FantasyTeam[] = [MOCK_TEAM];

const MOCK_LEAGUE: FantasyLeague = { id: 1, leagueName: 'Detroit Pro Roto League', leagueId: 862104690, leagueSport: 'mlb' };
const MOCK_LEAGUE_LIST: FantasyLeague[] = [MOCK_LEAGUE];
