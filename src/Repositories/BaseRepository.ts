import httpErrors = require('httperrors')
import { IRepositoryRead } from './IRepositoryRead'

abstract class BaseRepository<T> implements IRepositoryRead<T> {
  protected table: string

  constructor(
    private modelType: new (data) => T,
    protected datasource: any,
  ) {}

  public async findAll(): Promise<T[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.datasource.query(`SELECT * FROM ${this.table}`)

        resolve(res.rows.map((row) => new this.modelType(row)))
      } catch (error) {
        reject(error)
      }
    })
  }

  public async find(id: string): Promise<T> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.datasource.query(`SELECT * FROM ${this.table} WHERE id='${id}'`)

        if (res.rowCount < 1) {
          reject(new httpErrors.NotFound(`${this.modelType.name} with id ${id} not found`))
        }

        resolve(new this.modelType(res.rows[0]))
      } catch (error) {
        reject(error)
      }
    })
  }
}

export default BaseRepository
