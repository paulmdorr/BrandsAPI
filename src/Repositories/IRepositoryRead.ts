export interface IPagination {
  limit: number,
  offset: number
}

export interface IRepositoryRead<T> {
  find(id: string): Promise<T>
  findAll(pagination: IPagination): Promise<T[]>
}
