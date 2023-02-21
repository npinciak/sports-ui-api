import { IBaseControllerClass } from '../models/base-controller.model';
import { Router } from 'express';

export function BaseRouter<T>({ controller }: { controller: IBaseControllerClass<T> }): IBaseRouterClass {
  class BaseRouterClass {
    static router = Router();

    static get getAll() {
      return BaseRouterClass.router.get('/', async (req, res) => controller.getAllEntities(res));
    }

    static get getById() {
      return BaseRouterClass.router.get('/:id', async (req, res) => controller.getEntityById(req, res));
    }

    static get create() {
      return BaseRouterClass.router.post('/', async (req, res) => controller.createEntity(req, res));
    }

    static get update() {
      return BaseRouterClass.router.put('/:id', async (req, res) => controller.updateEntityById(req, res));
    }

    static get delete() {
      return BaseRouterClass.router.delete('/:id', async (req, res) => controller.deleteEntityById(req, res));
    }
  }

  return BaseRouterClass;
}

type IBaseRouterAttributes = 'getAll' | 'getById' | 'delete' | 'update' | 'create';
type IBaseRouterClass = { [key in IBaseRouterAttributes]: Router } & {
  new (...args: any[]): any;
};
