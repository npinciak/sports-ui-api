import { Response, Request } from 'express';
import { OneOrMany } from '../../shared/models/one-or-many.model';

export interface IBaseControllerClass<EntityType> {
  new (...args: any[]): any;
  getEntityById(req: Request, res: Response): Promise<Response<OneOrMany<EntityType>, Record<string, OneOrMany<EntityType>>>>;
  getAllEntities(res: Response): Promise<Response<OneOrMany<EntityType>, Record<string, OneOrMany<EntityType>>>>;
  createEntity(req: Request, res: Response): Promise<Response<OneOrMany<EntityType>, Record<string, OneOrMany<EntityType>>>>;
  updateEntityById(req: Request, res: Response): Promise<Response<OneOrMany<EntityType>, Record<string, OneOrMany<EntityType>>>>;
  deleteEntityById(req: Request, res: Response): Promise<Response<OneOrMany<EntityType>, Record<string, OneOrMany<EntityType>>>>;
}
