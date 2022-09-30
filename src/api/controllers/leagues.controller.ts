import { League } from '../models/league.model';
import { BaseController, jsonResponse } from './base.controller';
import { BaseQueryController } from './base-query.controller';
import { Request, Response } from 'express';
import axios, { AxiosError } from 'axios';
import { EspnClientLeague } from '../../shared/models/espn-client.model';

class queryController extends BaseQueryController({ primaryKeyProperty: 'id', entityIdProperty: 'leagueId', modelClass: League }) {}

export class LeaguesController extends BaseController<League>({ queryController }) {
  static async verify(req: Request, res: Response) {
    const leagueSport = req.body.leagueSport;
    const year = req.body.leagueYear;
    const leagueId = req.body.leagueId;

    try {
      const data = await axios
        .get<EspnClientLeague>(`https://fantasy.espn.com/apis/v3/games/${leagueSport}/seasons/${year}/segments/0/leagues/${leagueId}`)
        .then(v => {
          const message = { leagueName: v.data.settings.name, leagueId: v.data.id.toString() };
          return jsonResponse(res, v.status, message);
        })
        .catch(err => Promise.reject(err));

      return data;
    } catch (err) {
      const error = err as Error | AxiosError;
      if (axios.isAxiosError(error)) {
        return jsonResponse(res, error.response.status, error.response.data);
      }
      console.error(error);
      return jsonResponse(res, 500, 'Something went wrong');
    }
  }
}
