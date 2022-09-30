import { BaseController } from './base.controller';
import { BaseQueryController } from './base-query.controller';
import { DfsPlayer } from '../models/dfs-player.model';

class queryController extends BaseQueryController({ primaryKeyProperty: 'id', entityIdProperty: 'id', modelClass: DfsPlayer }) {}

export class DfsPlayersController extends BaseController<DfsPlayer>({ queryController }) {}
