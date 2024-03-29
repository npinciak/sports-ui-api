import { ClientPlayerAttributes } from './daily-fantasy-client-slate-attr.model';
import { Vegas } from './daily-fantasy-client.model';
import { PlayerEcrByDfsSiteType } from './nfl-client.model';

export type ValueProperties = {
  stack_value: string;
  top_value: string;
  smash_value: string;
  stack_leverage: string;
  stack_field: string;
  stack_diff: string;
};

export interface MLBClientPitcherAttr {
  last_name: string;
  first_name: string;
  hand: 'L' | 'R';
  id: string;
}

export type MLBClientTeamAttrProperties = Omit<
  ClientPlayerAttributes,
  'stat_group' | 'salary_diff' | 'slate_ownership' | 'ownership' | 'value_pct'
> & {
  pitcher: MLBClientPitcherAttr;
  team_total: number;
};

export interface MLBClientPlayerAttributeProperties {
  hand: string;
  stats: StatSplit;
  batting_order: BattingOrder;
  stat_group: string;
  plateiq: PlateIq;
  ecr: PlayerEcrByDfsSiteType;
}

export interface StatSplit {
  'last-two': StatsPropertiesMap;
  season: StatsPropertiesMap;
  '12weeks': StatsPropertiesMap;
  '4weeks': StatsPropertiesMap;
  '2weeks': StatsPropertiesMap;
  '1week': StatsPropertiesMap;
  yesterday: Pick<
    StatsPropertiesMap,
    'id' | 'name' | 'muwoba' | 'ab' | 'avg' | 'woba' | 'iso' | 'obp' | 'slg' | 'k%' | 'bb%' | 'ops' | 'babip'
  >;
}

type StatsProperties =
  | 'id'
  | 'name'
  | 'xwoba'
  | 'wellHitPct'
  | 'obp'
  | 'ops'
  | 'slg'
  | 'hbp'
  | 'hr/fb'
  | 'k'
  | 'sb'
  | 'gp'
  | 'ab'
  | 'woba'
  | 'iso'
  | 'babip'
  | 'avg'
  | 'k%'
  | 'bb%'
  | 'muwoba';

type StatsPropertiesMap = { [prop in StatsProperties]: string };

export interface BattingAttributes {
  batting_order: BattingOrder;
}

export interface BattingOrder {
  order: string;
  confirmed: number;
}

export interface PlateIq {
  score: { [prop in PlateIqScoreProperties]: number };
  factors: PlateIqFactors;
}

type PlateIqScoreProperties =
  | 'contact'
  | 'context'
  | 'pitchTypes'
  | 'Production'
  | 'plateDiscipline'
  | 'recentSkill'
  | 'stolenBase'
  | 'sbFactor'
  | 'overall';

export interface PlateIqFactors {
  positive: FactorEntity[] | null;
  negative: FactorEntity[] | null;
  positiveCt: number;
  negativeCt: number;
}
export interface FactorEntity {
  name: string;
  comparisonValue: number;
  description: string;
  type: string;
}

export type MLBClientSlateAttrTeam = { vegas: Vegas } & MLBClientTeamAttrProperties;
export type MLBClientPlayerAttributes = MLBClientPlayerAttributeProperties &
  Omit<ClientPlayerAttributes, 'stat_group' | 'salary_diff' | 'slate_ownership' | 'ownership' | 'value_pct'>;
export type MLBClientTeamAttributes = MLBClientTeamAttrProperties & ValueProperties;
