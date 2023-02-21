import { Team } from '../models/team.model';
import { BaseController } from './base.controller';
import { BaseQueryController } from './base-query.controller';

class queryController extends BaseQueryController({ primaryKeyProperty: 'id', entityIdProperty: 'teamId', modelClass: Team }) {}

export class TeamsController extends BaseController<Team>({ queryController }) {}
