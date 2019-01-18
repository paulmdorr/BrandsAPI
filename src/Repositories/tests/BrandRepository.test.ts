import BrandRepository from '../BrandRepository'
import Brand from '../../Models/Brand'

let result
let brandRepository: BrandRepository
let brokenBrandRepository: BrandRepository

beforeEach(() => {
  const mockBrandRepository = (res) => {
    const mockDatasource = {
      query: jest.fn(() => res),
    }
    return new BrandRepository(Brand, mockDatasource)
  }

  const brokenMockBrandRepository = (res) => {
    const mockDatasource = {
      query: jest.fn(() => { throw Error() }),
    }
    return new BrandRepository(Brand, mockDatasource)
  }

  result = {
    rows: [
      {
        id: 0,
        name: 'test',
        categoryId: 1,
      },
    ],
  }

  brandRepository = mockBrandRepository(result)
  brokenBrandRepository = brokenMockBrandRepository(result)
})

describe('BrandRepository tests', () => {
  test('finds all the brands', async () => {
    const res = await brandRepository.findAll()

    expect(res[0] instanceof Brand).toBe(true)
    expect(res).toMatchObject(result.rows)

    await expect(brokenBrandRepository.findAll()).rejects.toMatchObject({
      message: '',
    })
  })

  test('finds brand by id', async () => {
    const res = await brandRepository.find('1')

    expect(res instanceof Brand).toBe(true)
    expect(res.toJSON()).toMatchObject(result.rows[0])

    result.rowCount = 0

    await expect(brandRepository.find('2')).rejects.toMatchObject({
      message: 'Brand with id 2 not found',
    })
    await expect(brokenBrandRepository.find('0')).rejects.toMatchObject({
      message: '',
    })
  })

  test('finds all the brands by category id', async () => {
    const res = await brandRepository.findByCategoryId('1')

    expect(res).toMatchObject(result.rows)

    await expect(brokenBrandRepository.findByCategoryId('0')).rejects.toMatchObject({
      message: '',
    })
  })

  test('saves a brand', async () => {
    const res = await brandRepository.create(result.rows[0])

    expect(res instanceof Brand).toBe(true)
    expect(res).toMatchObject(result.rows[0])

    await expect(brokenBrandRepository.create(result.rows[0])).rejects.toMatchObject({
      message: '',
    })
  })

  test('updates a brand', async () => {
    const res = await brandRepository.update('1', result.rows[0])

    expect(res instanceof Brand).toBe(true)
    expect(res).toMatchObject(result.rows[0])

    result.rowCount = 0

    await expect(brandRepository.update('2', result.rows[0])).rejects.toMatchObject({
      message: 'Brand with id 2 not found',
    })
    await expect(brokenBrandRepository.update('0', result.rows[0])).rejects.toMatchObject({
      message: '',
    })
  })

  test('removes a brand', async () => {
    const res = await brandRepository.delete('1')

    expect(res).toBe(true)

    result.rowCount = 0

    await expect(brandRepository.delete('2')).rejects.toMatchObject({
      message: 'Brand with id 2 not found',
    })
    await expect(brokenBrandRepository.delete('0')).rejects.toMatchObject({
      message: '',
    })
  })
})
