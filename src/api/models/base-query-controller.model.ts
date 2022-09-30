export interface IBaseQueryControllerClass<T> {
  new (...args: any[]): any;
  getEntityById(id: string): Promise<T>;
  getAllEntities(): Promise<T[]>;
  createEntity(payload: object): Promise<T>;
  updateEntityById(id: string, payload: object): Promise<T>;
  deleteEntityById(id: string): Promise<T>;
}
