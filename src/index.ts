import express from 'express'

import { router as customerRouter } from './routes/customer'
import { router as productRouter } from './routes/product'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/customer', customerRouter)
app.use('/product', productRouter)

app.listen(3000, () =>
    console.log('REST API server ready at: http://localhost:3000'),
)