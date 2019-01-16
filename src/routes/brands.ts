import Router from 'express-promise-router'
import Brand from '../Models/Brand'
import BrandRepository from '../Repositories/BrandRepository'
import pool from '../db'

const router = Router()

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const brandRepository = new BrandRepository(Brand, pool)
  const brands = await brandRepository.find(id)

  res.send(brands)
})

export default router
