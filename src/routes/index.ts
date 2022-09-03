import { Router } from 'express';
import { leaguesRouter } from './leagues.route';
import { TeamTestRouter } from './teams.route';
import { usersRouter } from './users.route';

const router = Router();

router.use('/leagues', leaguesRouter);
router.use('/users', usersRouter);
router.use('/teams', TeamTestRouter.getAll);

export { router };
