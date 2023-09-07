import { PrismaClient } from '@prisma/client'
import express from 'express'

import handlePrismaError from '../utils/handlePrismaError'

const prisma = new PrismaClient()
export const router = express.Router()

router.get('/', async (req, res) => {
    const { name, username, email } = req.query
    const customer = await prisma.customer.findMany({
        where: {
            OR: [
                {
                    name: { contains: String(name) }
                },
                {
                    username: { contains: String(username) }
                },
                {
                    email: { equals: String(email) }
                }
            ]
        },
        select: {
            name: true,
            username: true,
            email: true,
            reviews: true,
        }
    })
    res.json(customer)
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const customer = await prisma.customer.findUnique({
        where: { id: Number(id) }
    })
    res.json(customer)
})

router.post('/', async (req, res, next) => {
    const { name, email, username, reviews } = req.body
    try {
        const result = await prisma.customer.create({
            data: {
                name,
                email,
                username,
                reviews: {
                    create: reviews,
                }
            },
        })
        res.json(result)
    } catch (e: any) {
        handlePrismaError(e, req, res, next);
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { name, email, username } = req.body
    const customer = await prisma.customer.update({
        where: { id: Number(id) },
        data: {
            name,
            email,
            username,
        },
    })
    res.json(customer)
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    const customer = await prisma.customer.delete({
        where: { id: Number(id) },
    })
    res.json(customer)
})