import * as express from 'express'
import brands from './routes/brands'
import categories from './routes/categories'
import { json as jsonParser } from 'body-parser'
import morgan = require('morgan')
import httperrors = require('httperrors')

const app = express()
const router = express.Router()

app.use(jsonParser())

router.get('/', (req, res) => {
  res.json({
    message: 'Brands API v 0.1',
  })
})

app.use(morgan(':remote-addr - [:date[clf]] :method :url :status :res[content-length] - :response-time ms'))

app.use((req, res, next) => {
  // Here should be the auth lib that checks the JWT against the auth service
  if (!req.headers.authorization) {
    next(httperrors(403))
  }
  next()
})

app.use('/', router)
app.use('/brands', brands)
app.use('/categories', categories)

app.use('*', (req, res, next) => {
  // This should be a 404 but instead it's... an easter egg?
  next(httperrors.ImATeapot())
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500

  res.status(statusCode).json({
    error: {
      status: statusCode,
      message: err.message || 'Unexpected server error',
    },
  })
})

export default app
