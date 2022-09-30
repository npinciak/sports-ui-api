import axios from 'axios';
import { Request, Response } from 'express';
import { ApiClient } from 'helpers/http.client';
import { DfsSlatePlayer } from '../models/dfs-client-player.model';
import sequelize from '../config/connection';
import { DfsPlayer, PlayerAttributes } from '../models/dfs-player.model';

export function DfsSync() {
  class DfsSync {
    static async drop() {
      sequelize.sync().then(async () => {
        await DfsPlayer.drop()
          .then(() => console.log('DfsPlayer table drop successful'))
          .catch(() => console.error('DfsPlayer table drop failed'));
      });
    }

    static async import() {
      sequelize
        .sync()
        .then(async () => {
          const data = await axios
            .get<DfsSlatePlayer[]>(`https://s3.amazonaws.com/json.rotogrinders.com/v2.00/slates/draftkings/29/71429.json`)
            .then(data => data.data);

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

            console.log(`Created
              
            DfsPlayer: ${dfsCount}
         
          `);
          });
        })
        .catch(err => console.error(err));
    }

    static async importAttr() {
      sequelize.sync().then(async () => {
        const data = await axios
          .get<{ [id: string]: { id: string; salary_diff: { [id: number]: { salary: string } } } }>(
            `https://rotogrinders.com/schedules/nfl/game-attributes?date=2022-09-11&site=draftkings&slate_id=71429`
          )
          .then(data => data.data.players);

        const test = Object.entries(data).map(([id, player]) => ({
          id,
          dk_salary: Number(player),
        }));
        console.log(test);
      });
    }
  }

  return DfsSync;
}

// DfsSync().drop();
DfsSync().import();
// DfsSync().importAttr();
