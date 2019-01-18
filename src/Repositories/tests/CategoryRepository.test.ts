import CategoryRepository from '../CategoryRepository'
import Category from '../../Models/Category'
import { IPagination } from '../IRepositoryRead'

let result
let categoryRepository: CategoryRepository
let brokenCategoryRepository: CategoryRepository
let pagination: IPagination

beforeEach(() => {
  const mockCategoryRepository = (res) => {
    const mockDatasource = {
      query: jest.fn(() => res),
    }
    return new CategoryRepository(Category, mockDatasource)
  }

  const brokenMockCategoryRepository = (res) => {
    const mockDatasource = {
      query: jest.fn(() => { throw Error() }),
    }
    return new CategoryRepository(Category, mockDatasource)
  }

  result = {
    rows: [
      {
        id: 0,
        name: 'test',
      },
    ],
  }

  categoryRepository = mockCategoryRepository(result)
  brokenCategoryRepository = brokenMockCategoryRepository(result)
  pagination = {limit: 20, offset: 0}
})

describe('CategoryRepository tests', () => {
  test('finds all the categories', async () => {
    const res = await categoryRepository.findAll(pagination)

    expect(res[0] instanceof Category).toBe(true)
    expect(res).toMatchObject(result.rows)

    await expect(brokenCategoryRepository.findAll(pagination)).rejects.toMatchObject({
      message: '',
    })
  })

  test('finds category by id', async () => {
    const res = await categoryRepository.find('1')

    expect(res instanceof Category).toBe(true)
    expect(res.toJSON()).toMatchObject(result.rows[0])

    result.rowCount = 0

    await expect(categoryRepository.find('2')).rejects.toMatchObject({
      message: 'Category with id 2 not found',
    })
    await expect(brokenCategoryRepository.find('0')).rejects.toMatchObject({
      message: '',
    })
  })

  test('saves a category', async () => {
    const res = await categoryRepository.create(result.rows[0])

    expect(res instanceof Category).toBe(true)
    expect(res).toMatchObject(result.rows[0])

    await expect(brokenCategoryRepository.create(result.rows[0])).rejects.toMatchObject({
      message: '',
    })
  })

  test('updates a category', async () => {
    const res = await categoryRepository.update('1', result.rows[0])

    expect(res instanceof Category).toBe(true)
    expect(res).toMatchObject(result.rows[0])

    result.rowCount = 0

    await expect(categoryRepository.update('2', result.rows[0])).rejects.toMatchObject({
      message: 'Category with id 2 not found',
    })
    await expect(brokenCategoryRepository.update('0', result.rows[0])).rejects.toMatchObject({
      message: '',
    })
  })

  test('removes a category', async () => {
    const res = await categoryRepository.delete('1')

    expect(res).toBe(true)

    result.rowCount = 0

    await expect(categoryRepository.delete('2')).rejects.toMatchObject({
      message: 'Category with id 2 not found',
    })
    await expect(brokenCategoryRepository.delete('0')).rejects.toMatchObject({
      message: '',
    })
  })
})
