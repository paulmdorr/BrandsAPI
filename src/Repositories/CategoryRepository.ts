import httpErrors = require('httperrors')
import { IRepositoryWrite } from './IRepositoryWrite'
import Category from '../Models/Category'
import BaseRepository from './BaseRepository'

class CategoryRepository extends BaseRepository<Category> implements IRepositoryWrite<Category> {
  protected table: string = 'categories'

  public async create(data: Category): Promise<Category> {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `INSERT INTO ${this.table}(name)
          VALUES('${data.name}') RETURNING id`
        const res = await this.datasource.query(query)

        data.id = res.rows[0].id

        resolve(new Category(data))
      } catch (error) {
        reject(error)
      }
    })
  }

  public async update(id: string, data: Category): Promise<Category> {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `UPDATE ${this.table}
          SET name='${data.name}'
          WHERE id='${id}' RETURNING *`
        const res = await this.datasource.query(query)

        if (res.rowCount < 1) {
          reject(new httpErrors.NotFound(`Category with id ${id} not found`))
        }

        resolve(new Category(res.rows[0]))
      } catch (error) {
        reject(error)
      }
    })
  }

  public async delete(id: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `DELETE FROM ${this.table} WHERE id='${id}'`
        const res = await this.datasource.query(query)

        if (res.rowCount < 1) {
          reject(new httpErrors.NotFound(`Category with id ${id} not found`))
        }

        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }
}

export default CategoryRepository
