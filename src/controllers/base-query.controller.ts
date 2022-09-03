import { Model, ModelCtor } from 'sequelize-typescript';
import { Attributes, CreationAttributes, WhereOptions } from 'sequelize';
import { PropertyOfType } from './base.controller';

export function BaseQueryController<EntityType, M extends Model>({
  idProperty,
  modelClass,
}: {
  idProperty: PropertyOfType<EntityType, string | number>;
  modelClass: ModelCtor<M>;
}) {
  class BaseQueryControllerClass {
    static modelClass = modelClass;

    static getId = (t: EntityType) => t[idProperty] as unknown as string;

    static async getEntityById(id: string): Promise<M> {
      const where: WhereOptions<Attributes<M>> = { where: { [idProperty as any]: id } };

      try {
        const entity = await modelClass.findOne(where).then(entity => entity);

        if (entity) {
          return entity;
        } else {
          throw new Error('er');
        }
      } catch (error) {
        return error;
      }
    }

    static async getAllEntities() {
      try {
        return await modelClass.findAll().then(entity => entity);
      } catch (error) {
        console.error(error);
        return;
      }
    }

    static async createEntity(payload: CreationAttributes<M>) {
      try {
        return await modelClass.create(payload as CreationAttributes<M>).then(entity => entity);
      } catch (error) {
        console.error(error);
        return;
      }
    }

    static async deleteEntityById(id: string) {
      const where: WhereOptions<Attributes<M>> = { where: { [idProperty as any]: id } };

      try {
        const entity = await BaseQueryControllerClass.getEntityById(id);

        if (entity) {
          return await entity.destroy(where);
        }
      } catch (error) {
        return error;
      }
    }

    static async updateEntityById(id: string, payload: {}) {
      const where: WhereOptions<Attributes<M>> = { where: { [idProperty as any]: id } };

      try {
        const entity = await BaseQueryControllerClass.getEntityById(id);

        if (entity) {
          return await entity.update(payload, where).then(entity => entity);
        }
      } catch (error) {
        return error;
      }
    }
  }

  return BaseQueryControllerClass;
}

export interface IBaseQueryControllerClass<T> {
  new (...args: any[]): any;
  getEntityById(id: string): Promise<T>;
  getAllEntities(): Promise<T[]>;
  createEntity(payload: {}): Promise<T>;
  updateEntityById(id: string, payload: {}): Promise<T>;
  deleteEntityById(id: string): Promise<T>;
}
