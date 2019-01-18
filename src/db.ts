import { Pool } from 'pg'

const pool = new Pool({
  database: 'brands',
  host: 'localhost',
  password: 'asF3T=1gat',
  port: 5432,
  user: 'postgres',
})

export default {
  query: (text, params) => pool.query(text, params),
}
