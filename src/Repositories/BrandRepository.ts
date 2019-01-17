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

  public async create(data: Brand): Promise<Brand | boolean> {
    const query = `INSERT INTO ${this.table}(name, category_id)
      VALUES('${data.name}', '${data.categoryId}') RETURNING id`
    const res = await this.datasource.query(query)

    data.id = res.rows[0].id

    return Promise.resolve(new Brand(data))
  }

  public async update(id: string, data: Brand): Promise<Brand | boolean> {
    const query = `UPDATE ${this.table}
      SET name='${data.name}', category_id='${data.categoryId}'
      WHERE id='${id}' RETURNING *`
    const res = await this.datasource.query(query)

    return Promise.resolve(new Brand(res.rows[0]))
  }

  public async delete(id: string): Promise<boolean> {
    const query = `DELETE FROM ${this.table} WHERE id='${id}'`
    const res = await this.datasource.query(query)

    return Promise.resolve(true)
  }
}

export default BrandRepository
