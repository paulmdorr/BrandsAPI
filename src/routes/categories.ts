import Router from 'express-promise-router'
import { sanitizeParam, sanitizeBody, sanitizeQuery } from 'express-validator/filter'
import Category from '../Models/Category'
import CategoryRepository from '../Repositories/CategoryRepository'
import pool from '../db'
import { IPagination } from '../Repositories/IRepositoryRead'

const router = Router()
const categoryRepository = new CategoryRepository(Category, pool)

router.get('/', [
  sanitizeQuery('limit').escape().trim(),
  sanitizeQuery('offset').escape().trim(),
],  async (req, res) => {
  const pagination: IPagination = {
    limit: req.query.limit || 20,
    offset: req.query.offset || 0,
  }
  const categories = await categoryRepository.findAll(pagination)

  res.send(categories)
})

router.get('/:id', [
    sanitizeParam('id').escape().trim(),
  ], async (req, res) => {
  const { id } = req.params
  const categories = await categoryRepository.find(id)

  res.send(categories)
})

router.post('/', [
    sanitizeBody('name').escape().trim(),
  ], async (req, res) => {
  const category = await categoryRepository.create(req.body)

  res.send(category)
})

router.put('/:id',  [
  sanitizeParam('id').escape().trim(),
  sanitizeBody('name').escape().trim(),
], async (req, res) => {
  const { id } = req.params
  const brand = await categoryRepository.update(id, req.body)

  res.send(brand)
})

router.delete('/:id', [
    sanitizeParam('id').escape().trim(),
  ], async (req, res) => {
  const { id } = req.params
  const brand = await categoryRepository.delete(id)

  res.send(brand)
})

export default router
