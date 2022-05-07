import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import seedRouter from './routes/seedRoutes.js'
import productRouter from './routes/productRoutes.js'
import userRouter from './routes/userRoutes.js'

dotenv.config()

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to DB')
  })
  .catch((err) => {
    console.log(err.message)
  })

const app = express()
//form data in the post req will be parsed as a json object in side req.body
app.use(express.json()) //  convert the data to json
app.use(express.urlencoded({ extended: true }))
app.use('/api/seed', seedRouter)
app.use('/api/products', productRouter)
app.use('/api/users', userRouter)

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message })
})

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server 🏃 on http://localhost:${port}`))
