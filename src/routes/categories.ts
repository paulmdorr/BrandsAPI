import Router from 'express-promise-router'
import Category from '../Models/Category'
import CategoryRepository from '../Repositories/CategoryRepository'
import pool from '../db'

const router = Router()
const categoryRepository = new CategoryRepository(Category, pool)

router.get('/', async (req, res) => {
  const { id } = req.params
  const categories = await categoryRepository.findAll()

  res.send(categories)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const categories = await categoryRepository.find(id)

  res.send(categories)
})

router.post('/', async (req, res) => {
  const category = await categoryRepository.create(req.body)

  res.send(category)
})

export default router
