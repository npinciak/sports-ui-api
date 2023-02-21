import { UsersController } from '../controllers/users.controller';
import { Router } from 'express';
import { LeaguesController } from '../controllers/leagues.controller';
import { BaseRouter } from './base.route';

const leaguesRouter = Router();

leaguesRouter.get('/', async (_, res) => LeaguesController.getAllEntities(res));
leaguesRouter.post('/', async (req, res) => LeaguesController.createEntity(req, res));

leaguesRouter.get('/:id', async (req, res) => LeaguesController.getEntityById(req, res));
leaguesRouter.delete('/:id', async (req, res) => LeaguesController.deleteEntityById(req, res));

leaguesRouter.get('/users/:id', async (req, res) => UsersController.getUsersByLeagueId(req, res));

leaguesRouter.post('/verify', async (req, res) => LeaguesController.verify(req, res));

export { leaguesRouter };

export class LeagueTestRouter extends BaseRouter({ controller: LeaguesController }) {}
