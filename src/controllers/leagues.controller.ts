import { ApiClient } from 'helpers/http.client';
import { Request, Response } from 'express';

import { FantasyLeague, League } from '../models/league.model';
import { GenericController } from './generic.controller';
import axios from 'axios';

export class LeaguesController extends GenericController<FantasyLeague, League, 'id'>({ idProperty: 'id', modelClass: League }) {
  constructor() {
    super();
  }

  static async verify(req: Request, res: Response) {
    const leagueSport = req.body.leagueSport;
    const year = req.body.year;
    const leagueId = req.body.leagueId;
    try {
      const data = await axios
        .get(`https://fantasy.espn.com/apis/v3/games/${leagueSport}/seasons/${year}/segments/0/leagues/${leagueId}`)
        .then(data =>
          res.json({
            leagueName: data.data.settings.name,
            leagueId: data.data.id,
          })
        );
      return data;
    } catch (error) {
      return res.sendStatus(404);
    }
  }
}
