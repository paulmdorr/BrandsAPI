export interface IRepositoryRead<T> {
  find(id: string): Promise<T | boolean>
  findAll(): Promise<T[]>
}
