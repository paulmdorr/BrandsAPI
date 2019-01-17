import * as express from 'express'
import brands from './routes/brands'
import categories from './routes/categories'
import { json as jsonParser } from 'body-parser'

const app = express()
const router = express.Router()

app.use(jsonParser())

router.get('/', (req, res) => {
  res.json({
    message: 'Brands API v 0.1',
  })
})

app.use('/', router)
app.use('/brands', brands)
app.use('/categories', categories)

export default app
