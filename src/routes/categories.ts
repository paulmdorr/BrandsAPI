import Router from 'express-promise-router'
import { sanitizeParam, sanitizeBody } from 'express-validator/filter'
import Category from '../Models/Category'
import CategoryRepository from '../Repositories/CategoryRepository'
import pool from '../db'

const router = Router()
const categoryRepository = new CategoryRepository(Category, pool)

router.get('/', async (req, res) => {
  const categories = await categoryRepository.findAll()

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
