import Router from 'express-promise-router'
import Brand from '../Models/Brand'
import BrandRepository from '../Repositories/BrandRepository'
import pool from '../db'

const router = Router()
const brandRepository = new BrandRepository(Brand, pool)

router.get('/', async (req, res) => {
  const { id } = req.params
  const brands = await brandRepository.findAll()

  res.send(brands)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const brands = await brandRepository.find(id)

  res.send(brands)
})

router.post('/', async (req, res) => {
  const brands = await brandRepository.create(req.body)

  res.send(brands)
})

export default router
