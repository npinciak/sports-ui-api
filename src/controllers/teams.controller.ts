import { Team } from '../models/team.model';
import { BaseController } from './base.controller';
import { BaseQueryController } from './base-query.controller';

class TeamsQueryController extends BaseQueryController({ idProperty: 'teamId', modelClass: Team }) {}

export class TeamsController extends BaseController<Team>({ queryController: TeamsQueryController }) {}
