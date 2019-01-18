import httpErrors = require('httperrors')
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

  public async create(data: Brand): Promise<Brand> {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `INSERT INTO ${this.table}(name, category_id)
          VALUES('${data.name}', '${data.categoryId}') RETURNING id`
        const res = await this.datasource.query(query)

        data.id = res.rows[0].id

        resolve(new Brand(data))
      } catch (error) {
        reject(error)
      }
    })
  }

  public async update(id: string, data: Brand): Promise<Brand> {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `UPDATE ${this.table}
          SET name='${data.name}', category_id='${data.categoryId}'
          WHERE id='${id}' RETURNING *`
        const res = await this.datasource.query(query)

        if (res.rowCount < 1) {
          reject(new httpErrors.NotFound(`Brand with id ${id} not found`))
        }

        resolve(new Brand(res.rows[0]))
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
          reject(new httpErrors.NotFound(`Brand with id ${id} not found`))
        }

        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }
}

export default BrandRepository
