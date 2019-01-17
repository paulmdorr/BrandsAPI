import { Pool, QueryResult } from 'pg'
import { IRepositoryWrite } from './IRepositoryWrite'
import Category from '../Models/Category'
import BaseRepository from './BaseRepository'

class CategoryRepository extends BaseRepository<Category> implements IRepositoryWrite<Category> {
  protected table: string = 'categories'

  public async create(item: Category): Promise<Category | boolean> {
    const query = `INSERT INTO ${this.table}(name) VALUES('${item.name}') RETURNING id`
    const res = await this.datasource.query(query)

    item.id = res.rows[0].id

    return Promise.resolve(new Category(item))
  }

  public async update(id: string, item: Category): Promise<Category | boolean> {
    return this.datasource.query('test')
  }

  public async delete(id: string): Promise<boolean> {
    return this.datasource.query('test')
  }
}

export default CategoryRepository
