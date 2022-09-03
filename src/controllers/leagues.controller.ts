import { League } from '../models/league.model';
import { BaseController } from './base.controller';
import { BaseQueryController } from './base-query.controller';

class LeaguesQueryController extends BaseQueryController({ idProperty: 'leagueId', modelClass: League }) {}

export class LeaguesController extends BaseController<League>({ queryController: LeaguesQueryController }) {}
