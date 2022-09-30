import { BaseController } from './base.controller';
import { BaseQueryController } from './base-query.controller';
import { DfsPlayerAttr, DfsPlayerAttributes } from '../models/dfs-player-attributes.model';

class queryController extends BaseQueryController({ primaryKeyProperty: 'id', entityIdProperty: 'id', modelClass: DfsPlayerAttr }) {}

export class DfsPlayerAttributesController extends BaseController<DfsPlayerAttributes>({ queryController }) {}
