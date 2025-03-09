import { Request, Response, Router } from 'express'
import { createUserSchema, loginSchema, usersTable } from '../../db/usersSchema'
import { validateData } from '../../middlewares/validationMiddleware'
import bcrypt from 'bcryptjs'
import { db } from '../../db'
import { eq } from 'drizzle-orm'
import _ from 'lodash'
import jwt from 'jsonwebtoken'

const router = Router()

router.post(
  '/register',
  validateData(createUserSchema),
  async (req: Request, res: Response) => {
    try {
      const data = req.cleanBody
      const hashedPassword = await bcrypt.hash(data.password, 10)
      const [user] = await db
        .insert(usersTable)
        .values({ ...data, password: hashedPassword })
        .returning()
      const cleanUser = _.omit(user, 'password')
      res.status(201).json({
        cleanUser,
      })
    } catch (e) {
      res.status(500).send('Something went wrong')
    }
  }
)

router.post(
  '/login',
  validateData(loginSchema),
  async (req: Request, res: Response) => {
    try {
      const { email, password } = req.cleanBody
      const [user] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email))

      if (!user) {
        res.status(401).json({
          error: 'Authentication failed!',
        })
        return
      }
      const matched = await bcrypt.compare(password, user.password)
      if (!matched) {
        res.status(401).json({
          error: 'Authentication failed!',
        })
        return
      }
      const token = jwt.sign(
        { userId: user.id, role: user.role, email: user.email },
        String(process.env.JWT_SECRET),
        {
          expiresIn: '30d',
        }
      )
      const cleanUser = _.omit(user, 'password')
      res.status(200).json({
        token,
        user: cleanUser,
      })
    } catch (e) {
      res.status(500).send('Something went wrong')
    }
  }
)

export default router
