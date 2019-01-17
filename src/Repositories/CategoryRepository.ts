import { Pool, QueryResult } from 'pg'
import { IRepositoryWrite } from './IRepositoryWrite'
import Category from '../Models/Category'
import BaseRepository from './BaseRepository'

class CategoryRepository extends BaseRepository<Category> implements IRepositoryWrite<Category> {
  protected table: string = 'categories'

  public async create(data: Category): Promise<Category | boolean> {
    const query = `INSERT INTO ${this.table}(name) VALUES('${data.name}') RETURNING id`
    const res = await this.datasource.query(query)

    data.id = res.rows[0].id

    return Promise.resolve(new Category(data))
  }

  public async update(id: string, data: Category): Promise<Category | boolean> {
    const query = `UPDATE ${this.table}
      SET name='${data.name}'
      WHERE id='${id}' RETURNING *`
    const res = await this.datasource.query(query)

    return Promise.resolve(new Category(res.rows[0]))
  }

  public async delete(id: string): Promise<boolean> {
    const query = `DELETE FROM ${this.table} WHERE id='${id}'`
    const res = await this.datasource.query(query)

    return Promise.resolve(true)
  }
}

export default CategoryRepository
