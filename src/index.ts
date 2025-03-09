import express, { json, urlencoded } from 'express'
import productsRoutes from './routes/products'
import authRoutes from './routes/auth'

const port = 3000
const app = express()

app.use(urlencoded({ extended: false }))
app.use(json())

app.use('/products', productsRoutes)
app.use('/auth', authRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}..`)
})
