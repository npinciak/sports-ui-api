import { Router } from 'express';
import { dfsPlayerAttr } from './dfs-players-attributes.route';
import { dfsPlayer } from './dfs-players.route';
import { leaguesRouter } from './leagues.route';
import { TeamTestRouter } from './teams.route';
import { usersRouter } from './users.route';

const router = Router();

router.use('/leagues', leaguesRouter);
router.use('/users', usersRouter);
router.use('/dfs', dfsPlayer);
router.use('/dfs-attr', dfsPlayerAttr);

router.use('/teams', TeamTestRouter.getAll);

export { router };
