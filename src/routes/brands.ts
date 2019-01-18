import Router from 'express-promise-router'
import { sanitizeParam, sanitizeBody } from 'express-validator/filter'
import Brand from '../Models/Brand'
import BrandRepository from '../Repositories/BrandRepository'
import pool from '../db'

const router = Router()
const brandRepository = new BrandRepository(Brand, pool)

router.get('/', async (req, res) => {
  const brands = await brandRepository.findAll()

  res.send(brands)
})

router.get('/:id', [
    sanitizeParam('id').escape(),
  ], async (req, res) => {
  const { id } = req.params
  const brands = await brandRepository.find(id)

  res.send(brands)
})

router.post('/', [
    sanitizeBody('name').escape(),
    sanitizeBody('categoryId').escape(),
  ], async (req, res) => {
  const brand = await brandRepository.create(req.body)

  res.send(brand)
})

router.put('/:id', [
    sanitizeParam('id').escape(),
    sanitizeBody('name').escape(),
    sanitizeBody('categoryId').escape(),
  ], async (req, res) => {
  const { id } = req.params
  const brand = await brandRepository.update(id, req.body)

  res.send(brand)
})

router.delete('/:id', [
    sanitizeParam('id').escape(),
  ], async (req, res) => {
  const { id } = req.params
  const brand = await brandRepository.delete(id)

  res.send(brand)
})

export default router
