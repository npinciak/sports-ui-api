import { UsersController } from '../controllers/users.controller';
import { Router } from 'express';

const usersRouter = Router();

usersRouter.get('/', async (req, res) => UsersController.getAllEntities(res));
usersRouter.get('/:id', async (req, res) => UsersController.getEntityById(req, res));
usersRouter.put('/:id', async (req, res) => UsersController.updateEntityById(req, res));
usersRouter.delete('/:id', async (req, res) => UsersController.deleteEntityById(req, res));

export { usersRouter };
