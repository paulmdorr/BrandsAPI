import { Pool, QueryResult } from 'pg'
import { IRepositoryWrite } from './IRepositoryWrite'
import Brand from '../Models/Brand'
import BaseRepository from './BaseRepository'

class BrandRepository extends BaseRepository<Brand> implements IRepositoryWrite<Brand> {
  protected table: string = 'brands'

  public async findByCategoryId(categoryId: string): Promise<Brand[]> {
    const res = await this.datasource.query(
      `SELECT * FROM ${this.table} WHERE category_id = '${categoryId}'`,
    )

    return Promise.resolve(res.rows.map((row) => new Brand(row)))
  }

  public async create(item: Brand): Promise<Brand | boolean> {
    const query = `INSERT INTO ${this.table}(name, category_id)
      VALUES('${item.name}', '${item.categoryId}') RETURNING id`
    const res = await this.datasource.query(query)

    item.id = res.rows[0].id

    return Promise.resolve(new Brand(item))
  }

  public async update(id: string, item: Brand): Promise<Brand | boolean> {
    return this.datasource.query('test')
  }

  public async delete(id: string): Promise<boolean> {
    return this.datasource.query('test')
  }
}

export default BrandRepository
