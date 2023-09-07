import { PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
export const router = express.Router()

router.get('/', async (req, res) => {
    const products = await prisma.product.findMany()
    res.json(products)
})

router.get('/search', async (req, res) => {
    const { id, name, lowPrice, highPrice } = req.query
    const product = await prisma.product.findMany({
        where: {
            OR: [
                {
                    id: { equals: Number(id) || undefined }
                },
                {
                    name: { contains: String(name) || undefined }
                },
                {
                    price: { gte: Number(lowPrice) || undefined }
                },
            ]
        },
    })
    res.json(product)
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const product = await prisma.product.findUnique({
        where: { id: Number(id) },
        include: {
            Images: true,
        },
    })
    res.json(product)
})

router.post('/', async (req, res) => {
    const { name, price, reviews } = req.body
    const result = await prisma.product.create({
        data: {
            name,
            price: Number(price),
            Images: {
                create: [
                    {
                        url: 'https://source.unsplash.com/random',
                    }
                ]
            }
        },
    })
    res.json(result)
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { name, price } = req.body
    const product = await prisma.product.update({
        where: { id: Number(id) },
        data: {
            name,
            price,
        },
    })
    res.json(product)
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    const product = await prisma.product.delete({
        where: { id: Number(id) },
    })
    res.json(product)
})