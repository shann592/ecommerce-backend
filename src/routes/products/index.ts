import { Router } from 'express'
import {
  getProductById,
  listProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from './productsController'
import { validateData } from '../../middlewares/validationMiddleware'
import {
  creatProductSchema,
  updateProductSchema,
} from '../../db/productsSchema'

const router = Router()

router.get('/', listProducts)
router.get('/:id', getProductById)
router.post('/', validateData(creatProductSchema), createProduct)
router.put('/:id', validateData(updateProductSchema), updateProduct)
router.delete('/:id', deleteProduct)
export default router
