import { Prisma } from "@prisma/client"
import { Request, Response } from "express"

const handlePrismaError = (e: Prisma.PrismaClientKnownRequestError, req: Request, res: Response, next: any) => {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
        let meta = ''
        switch (e.code) {
            case 'P2002':
                meta = 'Duplicate entry'
                break
            case 'P2025':
                meta = 'Invalid input'
                break
            default:
                console.error(e)
                meta = 'Prisma error'
        }
        return res.status(400).json({ error: 'Prisma error', meta })
    }
    next(e)
}

export default handlePrismaError