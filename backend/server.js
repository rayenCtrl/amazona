import express from 'express'
import data from './data.js'

const app = express()

app.get('/api/products', (req, res) => {
  res.send(data.product)
})

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server 🏃 on http://localhost:${port}`))
