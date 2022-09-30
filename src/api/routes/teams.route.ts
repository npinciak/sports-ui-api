import { TeamsController } from '../controllers/teams.controller';
import { Router } from 'express';
import { BaseRouter } from './base.route';

const teamsRouter = Router();

teamsRouter.get('/', async (req, res) => TeamsController.getAllEntities(res));
teamsRouter.get('/:id', async (req, res) => TeamsController.getEntityById(req, res));
teamsRouter.put('/:id', async (req, res) => TeamsController.updateEntityById(req, res));
teamsRouter.delete('/:id', async (req, res) => TeamsController.deleteEntityById(req, res));

export { teamsRouter };

export class TeamTestRouter extends BaseRouter({ controller: TeamsController }) {}
