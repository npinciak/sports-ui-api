import { Response, Request } from 'express';
import { OneOrMany } from 'shared/models/one-or-many.model';
import { IBaseQueryControllerClass } from './base-query.controller';

export type PropertyOfType<T, U> = { [K in keyof T]: T[K] extends U ? K : never }[keyof T];

export function BaseController<EntityType>({
  queryController,
}: {
  queryController: IBaseQueryControllerClass<EntityType>;
}): IBaseControllerClass<EntityType> {
  class BaseControllerClass {
    static queryController = queryController;

    static getEntityById(req: Request, res: Response) {
      return queryController
        .getEntityById(req.params.id)
        .then(t => BaseControllerClass.jsonResponse(res, res.statusCode, t))
        .catch(err => BaseControllerClass.jsonResponse(res, 404, err));
    }

    static getAllEntities(res: Response) {
      return queryController.getAllEntities().then(t => BaseControllerClass.jsonResponse(res, res.statusCode, t));
    }

    static createEntity(req: Request, res: Response) {
      const payload = { ...req.body };
      return queryController.createEntity({ payload }).then(t => BaseControllerClass.jsonResponse(res, res.statusCode, t));
    }

    static updateEntityById(req: Request, res: Response) {
      const id = req.params.id;
      const payload = { ...req.body };
      return queryController.updateEntityById(id, payload).then(t => BaseControllerClass.jsonResponse(res, res.statusCode, t));
    }

    static deleteEntityById(req: Request, res: Response) {
      const id = req.params.id;
      return queryController.deleteEntityById(id).then(t => BaseControllerClass.jsonResponse(res, res.statusCode, t));
    }

    static jsonResponse(
      res: Response,
      code: number,
      message: OneOrMany<EntityType>
    ): Response<OneOrMany<EntityType>, Record<string, OneOrMany<EntityType>>> {
      return res.status(code).json({ data: message });
    }
  }

  return BaseControllerClass;
}

export interface IBaseControllerClass<EntityType> {
  new (...args: any[]): any;
  jsonResponse(
    res: Response,
    code: number,
    message: OneOrMany<EntityType>
  ): Response<OneOrMany<EntityType>, Record<string, OneOrMany<EntityType>>>;
  getEntityById(req: Request, res: Response): Promise<Response<OneOrMany<EntityType>, Record<string, OneOrMany<EntityType>>>>;
  getAllEntities(res: Response): Promise<Response<OneOrMany<EntityType>, Record<string, OneOrMany<EntityType>>>>;
  createEntity(req: Request, res: Response): Promise<Response<OneOrMany<EntityType>, Record<string, OneOrMany<EntityType>>>>;
  updateEntityById(req: Request, res: Response): Promise<Response<OneOrMany<EntityType>, Record<string, OneOrMany<EntityType>>>>;
  deleteEntityById(req: Request, res: Response): Promise<Response<OneOrMany<EntityType>, Record<string, OneOrMany<EntityType>>>>;
}
