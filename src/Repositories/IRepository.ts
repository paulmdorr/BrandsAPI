export interface IRepository<T> {
  create(item: T): Promise<T | boolean>
  update(id: string, item: T): Promise<T | boolean>
  delete(id: string): Promise<T | boolean>
  find(id: string): Promise<T>
  findAll(): Promise<T[]>
}
