import { Pool, QueryResult } from 'pg'
import { IRepositoryRead } from './IRepositoryRead'

abstract class BaseRepository<T> implements IRepositoryRead<T> {
  protected table: string

  constructor(
    private modelType: new (data) => T,
    protected datasource: any,
  ) {}

  public async findAll(): Promise<T[]> {
    const res = await this.datasource.query(`SELECT * FROM ${this.table}`)

    return Promise.resolve(res.rows.map((row) => new this.modelType(row)))
  }

  public async find(id: string): Promise<T | boolean> {
    const res = await this.datasource.query(`SELECT * FROM ${this.table} WHERE id='${id}'`)

    return Promise.resolve(res.rowCount === 1 ? new this.modelType(res.rows[0]) : false)
  }
}

export default BaseRepository
