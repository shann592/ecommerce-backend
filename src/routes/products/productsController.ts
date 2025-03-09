import { Request, Response } from 'express'
import { db } from '../../db/index'
import { createProductSchema, productsTable } from '../../db/productsSchema'
import { eq } from 'drizzle-orm'
import _ from 'lodash'

export async function listProducts(req: Request, res: Response) {
  try {
    const products = await db.select().from(productsTable)
    return res.json(products)
  } catch (err) {
    res.status(500).send(err)
  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)
    const [product] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, id))
    if (!product) {
      return res.status(404).json({ message: 'product was not found!' })
    }
    res.json(product)
  } catch (err) {
    res.status(500).send(err)
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    const [product] = await db
      .insert(productsTable)
      .values(req.cleanBody)
      .returning()
    return res.status(201).json(product)
  } catch (err) {
    res.status(500).send(err)
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)
    const [product] = await db
      .update(productsTable)
      .set(req.cleanBody)
      .where(eq(productsTable.id, id))
      .returning()
    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ message: 'product was not found!' })
    }
  } catch (err) {
    res.status(500).send(err)
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)
    const [deletedProduct] = await db
      .delete(productsTable)
      .where(eq(productsTable.id, id))
      .returning()
    if (deletedProduct) {
      res.sendStatus(204)
    } else {
      res.status(404).json({ message: 'product was not found!' })
    }
  } catch (err) {
    res.status(500).send(err)
  }
}
