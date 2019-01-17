export interface IRepositoryWrite<T> {
  create(data: T): Promise<T | boolean>
  update(id: string, data: T): Promise<T | boolean>
  delete(id: string): Promise<T | boolean>
}
