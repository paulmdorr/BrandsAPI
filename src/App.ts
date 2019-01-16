import * as express from 'express'
import brands from './routes/brands'

class App {
  public express: express

  constructor() {
    this.express = express()
    this.mountRoutes()
  }

  private mountRoutes(): void {
    const router = express.Router()

    router.get('/', (req, res) => {
      res.json({
        message: 'Brands API v 0.1',
      })
    })

    this.express.use('/', router)
    this.express.use('/brands', brands)
  }
}

export default new App().express
