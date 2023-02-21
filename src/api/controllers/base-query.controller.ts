import { Model, ModelCtor } from 'sequelize-typescript';
import { Attributes, CreationAttributes, WhereOptions } from 'sequelize';
import { PropertyOfType } from './base.controller';
import { IBaseQueryControllerClass } from '../models/base-query-controller.model';

export function BaseQueryController<EntityType, M extends Model>({
  primaryKeyProperty,
  entityIdProperty,
  modelClass,
}: {
  primaryKeyProperty: PropertyOfType<EntityType, string | number>;
  entityIdProperty: PropertyOfType<EntityType, string | number>;
  modelClass: ModelCtor<M>;
}) {
  class BaseQueryControllerClass {
    static modelClass = modelClass;

    static getEntityId = (t: EntityType) => t[entityIdProperty] as unknown as string;
    static getPrimaryKey = (t: EntityType) => t[primaryKeyProperty] as unknown as string;

    static async getEntityById(id: string): Promise<M> {
      const where: WhereOptions<Attributes<M>> = { where: { [entityIdProperty as any]: id } };

      try {
        const entity = await modelClass.findOne(where).then(entity => entity);

        if (entity) {
          return entity;
        } else {
          throw new Error(`Could not retrieve ${id}`);
        }
      } catch (error) {
        return error;
      }
    }

    static async getAllEntities() {
      try {
        return await modelClass.findAll().then(entity => entity);
      } catch (error) {
        return error;
      }
    }

    static async createEntity(payload: CreationAttributes<M>) {
      try {
        return await modelClass.create(payload).then(entity => entity);
      } catch (error) {
        return error;
      }
    }

    static async deleteEntityById(id: string) {
      const where: WhereOptions<Attributes<M>> = { where: { [primaryKeyProperty as any]: id } };
      try {
        const entity = await modelClass.findByPk(id);

        if (entity) {
          return await entity.destroy(where);
        }
      } catch (error) {
        return error;
      }
    }

    static async updateEntityById(id: string, payload: {}) {
      const where: WhereOptions<Attributes<M>> = { where: { [entityIdProperty as any]: id } };

      try {
        const entity = await modelClass.findByPk(id);

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
