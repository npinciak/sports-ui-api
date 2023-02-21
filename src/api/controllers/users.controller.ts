import { User } from '../models/user.model';
import { Response, Request } from 'express';

import { BaseQueryController } from './base-query.controller';
import { BaseController, jsonResponse } from './base.controller';

class queryController extends BaseQueryController({ primaryKeyProperty: 'id', entityIdProperty: 'espnId', modelClass: User }) {
  static async getEntityByLeagueId(leagueId: string) {
    const where = { where: { leagueId } };

    try {
      return await queryController.modelClass.findAll(where).then(entity => entity);
    } catch (error) {
      return error;
    }
  }
}

export class UsersController extends BaseController<User>({ queryController }) {
  static getUsersByLeagueId(req: Request, res: Response) {
    return queryController.getEntityByLeagueId(req.params.id).then(t => jsonResponse(res, res.statusCode, t));
  }
}
