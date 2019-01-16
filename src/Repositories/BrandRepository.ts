import { Pool, QueryResult } from 'pg'
import { IRepository } from './IRepository'
import Brand from '../Models/Brand'
import BaseRepository from './BaseRepository';

class BrandRepository extends BaseRepository<Brand> {
  protected table: string = 'brands'

  public async findByCategoryId(categoryId: string): Promise<Brand[]> {
    const res = await this.datasource.query(`SELECT * FROM ${this.table}`)

    return Promise.resolve(res.rows.map((row) => new Brand(row)))
  }
}

export default BrandRepository
