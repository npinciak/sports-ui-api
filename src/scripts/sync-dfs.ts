import axios from 'axios';
import sequelize from '../config/connection';
import { DfsPlayer, PlayerAttributes } from '../api/models/dfs-player.model';
import { ClientSlateAttributes } from './dfs-client-models/daily-fantasy-client-slate-attr.model';
import { DfsSlatePlayer, SlateMasterMap } from './dfs-client-models/daily-fantasy-client.model';
import { DfsPlayerAttr } from '../api/models/dfs-player-attributes.model';
import { DailyFantasyEndpointBuilder } from '../helpers/dfs-endpoints.helper';

export function DfsSync() {
  class DfsSync {
    static slateId = '74919';
    static date = '2022-09-28';
    static sport = 'nfl';

    static async drop() {
      sequelize.sync().then(async () => {
        await Promise.all([
          DfsPlayer.drop()
            .then(() => console.log('DfsPlayer table drop successful'))
            .catch(() => console.error('DfsPlayer table drop failed')),

          DfsPlayerAttr.drop()
            .then(() => console.log('DfsPlayerAttr table drop successful'))
            .catch(() => console.error('DfsPlayerAttr table drop failed')),
          ,
        ]);
      });
    }

    static async importSlateMasterBySport() {
      const endpoint = new DailyFantasyEndpointBuilder(DfsSync.sport);

      const data = await axios.get<SlateMasterMap>(endpoint.slateMaster).then(data => data.data);
      const slatePaths = data.draftkings[this.slateId].slate_path;

      DfsSync.importPlayersBySlateId(slatePaths);
    }

    static async importPlayersBySlateId(slatePath: string) {
      sequelize
        .sync()
        .then(async () => {
          const data = await axios.get<DfsSlatePlayer[]>(slatePath).then(data => data.data);

          const dfs: PlayerAttributes[] = data
            .map(p => {
              return {
                id: Number(p.player.id),
                rgId: Number(p.player.rg_id),
                name: `${p.player.first_name} ${p.player.last_name}`,
                teamId: Number(p.player.team_id),
                rgTeamId: Number(p.player.rg_team_id),
                position: p.player.position,
              };
            })
            .filter(p => p.rgTeamId !== 0);

          await DfsPlayer.bulkCreate(dfs).then(async () => {
            const dfsCount = await DfsPlayer.findAll().then(p => p.length);
            console.log(`Imported ${dfsCount} players`);
          });
        })
        .catch(err => console.error(err));
    }

    static async importAttr() {
      sequelize.sync().then(async () => {
        const res = await axios
          .get(`https://rotogrinders.com/schedules/nfl/game-attributes?date=${DfsSync.date}&site=draftkings&slate_id=${DfsSync.slateId}`)
          .then(data => data.data.players);

        const test = Object.keys(res).map(key => {
          const p = res[key];
          return {
            id: Number(key),
            slateId: Number(DfsSync.slateId),
            dk_salary: p.salary_diff[20] ? Number(p.salary_diff[20]?.salary) : 0,
          };
        });

        await DfsPlayerAttr.bulkCreate(test).then(async () => {
          const dfsCount = await DfsPlayerAttr.findAll().then((p: any[]) => p.length);
          console.log(`Imported ${dfsCount} players attributes`);
        });
      });
    }
  }

  return DfsSync;
}

// DfsSync().importSlateMasterBySport();
DfsSync().importAttr();

// DfsSync().drop();
// DfsSync().import();
