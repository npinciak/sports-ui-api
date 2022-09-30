import { Response, Request } from 'express';
import { IBaseQueryControllerClass } from '../models/base-query-controller.model';

export type PropertyOfType<T, U> = { [K in keyof T]: T[K] extends U ? K : never }[keyof T];

export function BaseController<EntityType>({ queryController }: { queryController: IBaseQueryControllerClass<EntityType> }) {
  class BaseControllerClass {
    static queryController = queryController;

    static getEntityById(req: Request, res: Response) {
      return queryController
        .getEntityById(req.params.id)
        .then(t => jsonResponse<EntityType>(res, 200, t))
        .catch(err => jsonResponse<string>(res, 404, err));
    }

    static getAllEntities(res: Response) {
      return queryController
        .getAllEntities()
        .then(t => jsonResponse<EntityType[]>(res, 200, t))
        .catch(err => jsonResponse<string>(res, 404, err));
    }

    static createEntity(req: Request, res: Response) {
      const payload = { ...req.body };
      return queryController
        .createEntity(payload)
        .then(t => jsonResponse<EntityType>(res, 201, t))
        .catch(err => jsonResponse<string>(res, 404, err));
    }

    static updateEntityById(req: Request, res: Response) {
      const id = req.params.id;
      const payload = { ...req.body };
      return queryController
        .updateEntityById(id, payload)
        .then(t => jsonResponse<EntityType>(res, 201, t))
        .catch(err => jsonResponse<string>(res, 404, err));
    }

    static deleteEntityById(req: Request, res: Response) {
      const id = req.params.id;
      return queryController
        .deleteEntityById(id)
        .then(() => jsonResponse<string>(res, 204, null))
        .catch(err => jsonResponse<string>(res, 404, err));
    }
  }

  return BaseControllerClass;
}

export type IBaseResponse<T> = Omit<Response, 'json'> & { json(data: T): Response };

export function jsonResponse<T>(res: Response, status: number, msg: T): IBaseResponse<T> {
  return res.status(status).json({ data: msg });
}
