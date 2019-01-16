import { Pool, QueryResult } from 'pg'
import { IRepository } from './IRepository'

abstract class BaseRepository<T> implements IRepository<T> {
  protected table: string

  constructor(
    private modelType: new (data) => T,
    protected datasource: any,
  ) {}

  public async findAll(): Promise<T[]> {
    const res = await this.datasource.query(`SELECT * FROM ${this.table}`)

    return Promise.resolve(res.rows.map((row) => new this.modelType(row)))
  }

  public async find(id: string): Promise<T> {
    const res = await this.datasource.query(`SELECT * FROM ${this.table} WHERE id='${id}'`)

    return Promise.resolve(new this.modelType(res.rows[0]))
  }

  public async create(): Promise<T | boolean> {
    return this.datasource.query('test')
  }

  public async update(): Promise<T | boolean> {
    return this.datasource.query('test')
  }

  public async delete(): Promise<T | boolean> {
    return this.datasource.query('test')
  }
}

export default BaseRepository
