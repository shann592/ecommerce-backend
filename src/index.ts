import express from 'express'
import productsRoutes from './routes/products'

const app = express()

app.use('/products', productsRoutes)

app.listen(3000, () => {
  console.log('server running on port 3000...')
})
