import { Response, Request } from 'express';

import { User } from '../models/user.model';
import { BaseQueryController } from './base-query.controller';
import { BaseController } from './base.controller';

class UsersQueryController extends BaseQueryController({ idProperty: 'espnId', modelClass: User }) {
  static async getEntityByLeagueId(leagueId: string) {
    const where = { where: { leagueId } };

    try {
      return await UsersQueryController.modelClass.findAll(where).then(entity => entity);
    } catch (error) {
      return error;
    }
  }
}

export class UsersController extends BaseController<User>({ queryController: UsersQueryController }) {
  static getUsersByLeagueId(req: Request, res: Response) {
    return UsersQueryController.getEntityByLeagueId(req.params.id).then(t => UsersController.jsonResponse(res, res.statusCode, t));
  }
}
