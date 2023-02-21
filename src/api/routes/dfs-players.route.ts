import { Router } from 'express';
import { BaseRouter } from './base.route';
import { DfsPlayersController } from '../controllers/dfs-players.controller';

const dfsPlayer = Router();

dfsPlayer.get('/', async (req, res) => DfsPlayersController.getAllEntities(res));
dfsPlayer.get('/:id', async (req, res) => DfsPlayersController.getEntityById(req, res));
dfsPlayer.put('/:id', async (req, res) => DfsPlayersController.updateEntityById(req, res));
dfsPlayer.delete('/:id', async (req, res) => DfsPlayersController.deleteEntityById(req, res));

export { dfsPlayer };

// export class DfsPlayerRouter extends BaseRouter({ controller: DfsPlayersController }) {}
