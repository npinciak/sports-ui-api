import { FantasyLeague, FantasySports, League } from '../api/models/league.model';
import { FantasyTeam, Team } from '../api/models/team.model';
import sequelize from '../config/connection';

export function runMigration() {
  sequelize
    .sync()
    .then(async () => {
      //   DfsPlayer.bulkCreate([MOCK_DFS_PLAYER]);
      // User.bulkCreate(MOCK_USER_LIST);
      // Team.bulkCreate(MOCK_TEAM_LIST);
      // League.bulkCreate(MOCK_LEAGUE_LIST);
      //   const dfsCount = await DfsPlayer.findAll().then(p => p.length);
      // const userCount = await User.findAll().then(user => user.length);
      // const teamCount = await Team.findAll().then(team => team.length);
      // const leagueCount = await League.findAll().then(l => l.length);
    })
    .catch(err => console.error(err));
}

/*******/
runMigration();
/*******/

export const MOCK_TEAM: FantasyTeam = {
  teamName: 'Seamhead Express',
  teamId: 2,
  teamEspnLeagueId: '862104690',
  isFavorite: true,
  id: 1,
};
export const MOCK_TEAM_LIST: FantasyTeam[] = [MOCK_TEAM];

export const MOCK_LEAGUE: FantasyLeague = {
  id: 1,
  leagueName: 'Detroit Pro Roto League',
  leagueId: '862104690',
  leagueYear: '2022',
  leagueSport: FantasySports.baseball,
};

export const MOCK_LEAGUE_LIST: FantasyLeague[] = [
  MOCK_LEAGUE,
  {
    id: 2,
    leagueName: 'Atlanta Pro H2H Points PPR League',
    leagueId: '2143313016',
    leagueYear: '2022',
    leagueSport: FantasySports.football,
  },
];
// export const MOCK_USER: FantasyUserAttributes = {
//   id: 1,
//   user: 'god',
//   espnId: '2',
//   teamId: '2',
//   leagueId: '862104690',
// };

// export const MOCK_USER_LIST = [MOCK_USER];
