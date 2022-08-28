import { Request, Response } from 'express';
import { Model, ModelCtor } from 'sequelize-typescript';

export type PropertyOfType<T, U> = { [K in keyof T]: T[K] extends U ? K : never }[keyof T];

export function GenericController<EntityType, M extends Model, IdProperty extends PropertyOfType<EntityType, string | number>>({
  idProperty,
  modelClass,
}: {
  idProperty: IdProperty;
  modelClass: ModelCtor<M>;
}) {
  class GenericControllerBase {
    static modelClass = modelClass;

    static getId = (t: EntityType) => t[idProperty] as unknown as string;

    static jsonResponse(res: Response, code: number, message: string) {
      return res.status(code).json({ message });
    }

    // static findOne(req: Request, res: Response) {
    //   return modelClass.findAll({ where: { [idProperty]: req.params.d } });
    // }

    static findAll(res: Response) {
      return modelClass.findAll().then(l => res.json(l));
    }

    // { where: { [idProperty]: id } }

    // League.findAll({ where: { leagueId: req.params.id } }).then(l => res.json(l)));

    // // Create and Save a new Tutorial
    // create = (req: Request, res: Response<T>) => {};
    // // Retrieve all Tutorials from the database.
    // findAll = (req: Request, res: Response<T>) => {
    //   // .findAll().then(user => res.json(user));
    // };
    // // Find a single Tutorial with an id
    // findOne = (req: Request, res: Response<T>) => {};
    // // Update a Tutorial by the id in the request
    // update = (req: Request, res: Response<T>) => {};
    // // Delete a Tutorial with the specified id in the request
    // delete = (req: Request, res: Response<T>) => {};
    // // Delete all Tutorials from the database.
    // deleteAll = (req: Request, res: Response<T>) => {};
    // // Find all published Tutorials
    // findAllPublished = (req: Request, res: Response<T>) => {};
  }

  return GenericControllerBase;
}
