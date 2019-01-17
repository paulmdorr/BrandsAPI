export interface IRepositoryRead<T> {
  find(id: string): Promise<T>
  findAll(): Promise<T[]>
}
