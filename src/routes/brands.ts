import Router from 'express-promise-router'
import { sanitizeParam, sanitizeBody, sanitizeQuery } from 'express-validator/filter'
import Brand from '../Models/Brand'
import BrandRepository from '../Repositories/BrandRepository'
import pool from '../db'
import { IPagination } from '../Repositories/IRepositoryRead'

const router = Router()
const brandRepository = new BrandRepository(Brand, pool)

router.get('/', [
    sanitizeQuery('categoryId').escape().trim(),
    sanitizeQuery('limit').escape().trim(),
    sanitizeQuery('offset').escape().trim(),
  ], async (req, res) => {
  const pagination: IPagination = {
    limit: req.query.limit || 20,
    offset: req.query.offset || 0,
  }
  // ?categoryId= filters by category
  const { categoryId } = req.query
  const brands = categoryId !== undefined ?
    await brandRepository.findByCategoryId(categoryId, pagination) :
    await brandRepository.findAll(pagination)

  res.send(brands)
})

router.get('/:id', [
    sanitizeParam('id').escape().trim(),
  ], async (req, res, next) => {
  const { id } = req.params

  try {
    const brands = await brandRepository.find(id)
    res.send(brands)
  } catch (error) {
    next(error)
  }
})

router.post('/', [
    sanitizeBody('name').escape().trim(),
    sanitizeBody('categoryId').escape().trim(),
  ], async (req, res) => {
  const brand = await brandRepository.create(req.body)

  res.send(brand)
})

router.put('/:id', [
    sanitizeParam('id').escape().trim(),
    sanitizeBody('name').escape().trim(),
    sanitizeBody('categoryId').escape().trim(),
  ], async (req, res) => {
  const { id } = req.params
  const brand = await brandRepository.update(id, req.body)

  res.send(brand)
})

router.delete('/:id', [
    sanitizeParam('id').escape().trim(),
  ], async (req, res) => {
  const { id } = req.params
  const brand = await brandRepository.delete(id)

  res.send(brand)
})

export default router
