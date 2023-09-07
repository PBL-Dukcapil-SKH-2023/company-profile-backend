import { PrismaClient } from '@prisma/client'
import express from 'express'

import handlePrismaError from '../utils/handlePrismaError'

const prisma = new PrismaClient()
export const router = express.Router()

router.get('/', async (req, res) => {
    const { productId } = req.query
    const image = await prisma.image.findMany({
        where: { id: Number(productId) },
        select: {
            url: true,
        }
    })
    res.json(image)
})
