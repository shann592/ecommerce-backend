import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.send('all products')
})

export default router
