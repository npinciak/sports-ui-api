import express, { Express, Request, Response } from 'express';
import { FantasyLeague, FantasySports, League } from './models/league.model';
import sequelize from './config/connection';
import { FantasyTeam, Team } from './models/team.model';
import cors from 'cors';
import bodyParser from 'body-parser';
import { LeaguesController } from './controllers/leagues.controller';
import helmet from 'helmet';

const app: Express = express();
const PORT = 8080;

app
  .use(cors({ credentials: true, origin: true }))
  .use(bodyParser.json())
  .disable('X-Powered-By')
  .use(helmet());

app.listen(PORT, async () => {
  console.log(`⚡️ App is running at http://localhost:${PORT} in ${app.get('env')} mode`);

  try {
    await sequelize.authenticate();
    console.log('✨ Established connection to DB ✨');
  } catch (error) {
    console.error('⚰️ Unable to connect to DB ⚰️', error);
  }
});

app.get('/sync-all', async (req, res) => {
  // .then(() => {
  //   res.json('Connection has been established successfully.');
  // })
  // .catch(err => {
  //   res.json('Unable to connect to the database');
  // });

  sequelize.sync({ force: true }).then(() => {
    console.log(`Database & tables created!`);

    Team.bulkCreate(MOCK_TEAM_LIST).then(() => Team.findAll().then(user => res.json(user)));
    League.bulkCreate(MOCK_LEAGUE_LIST).then(() => League.findAll().then(l => res.json(l)));
  });
});

app.get('/teams', async (req, res) => Team.findAll().then(user => res.json(user)));

app.post('/teams', (req, res) => Team.create({ teamName: req.body.teamName, teamId: req.body.teamId }).then(t => res.json(t)));

app.get('/teams/:id', async (req, res) => Team.findAll({ where: { teamId: req.params.id } }).then(user => res.json(user)));

app.get('/leagues', async (req, res) => LeaguesController.findAll(res));

app.post('/leagues/verify', async (req, res) => LeaguesController.verify(req, res));

app.post('/leagues', (req, res) =>
  League.create({
    leagueName: req.body.leagueName,
    leagueId: req.body.leagueId,
    leagueSport: req.body.leagueSport,
  }).then(league => {
    res.json(league);
  })
);

app.get('/leagues/:id', async (req, res) => League.findAll({ where: { leagueId: req.params.id } }).then(l => res.json(l)));
app.delete('/leagues/:id', (req, res) =>
  League.findByPk(req.params.id)
    .then(league => league.destroy())
    .then(() => {
      // res.sendStatus(200);
      return League.findAll().then(l => res.json(l));
    })
);

const MOCK_TEAM: FantasyTeam = { teamName: 'Seamhead Express', teamId: 2, leagueId: '862104690', isFavorite: true, id: 1 };
const MOCK_TEAM_LIST: FantasyTeam[] = [MOCK_TEAM];

const MOCK_LEAGUE: FantasyLeague = {
  id: 1,
  leagueName: 'Detroit Pro Roto League',
  leagueId: '862104690',
  leagueSport: FantasySports.baseball,
};
const MOCK_LEAGUE_LIST: FantasyLeague[] = [MOCK_LEAGUE];
