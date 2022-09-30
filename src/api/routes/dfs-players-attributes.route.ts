import { Router } from 'express';
import { BaseRouter } from './base.route';
import { DfsPlayerAttributesController } from '../controllers/dfs-players-attributes.controller';

const dfsPlayerAttr = Router();

dfsPlayerAttr.get('/', async (req, res) => DfsPlayerAttributesController.getAllEntities(res));
dfsPlayerAttr.get('/:id', async (req, res) => DfsPlayerAttributesController.getEntityById(req, res));
dfsPlayerAttr.put('/:id', async (req, res) => DfsPlayerAttributesController.updateEntityById(req, res));
dfsPlayerAttr.delete('/:id', async (req, res) => DfsPlayerAttributesController.deleteEntityById(req, res));

export { dfsPlayerAttr };

export class DfsPlayerRouter extends BaseRouter({ controller: DfsPlayerAttributesController }) {}
