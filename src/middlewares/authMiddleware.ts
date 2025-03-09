import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['authorization']
  if (!token) {
    res.status(401).json({ error: 'Access denied!' })
    return
  }
  try {
    const decoded = jwt.verify(token, String(process.env.JWT_SECRET))

    if (typeof decoded !== 'object' || !decoded?.userId) {
      res.status(401).json({ error: 'Access denied!' })
      return
    }
    req.userId = decoded.userId
    req.role = decoded.role
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Access denied!' })
  }
}

export const verifySeller = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.role !== 'seller') {
    res.status(403).json({ error: 'Unauthorised!' })
    return
  }
  next()
}
