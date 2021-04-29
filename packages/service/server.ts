import express from 'express'
import { PrismaClient } from './db'

const prisma = new PrismaClient()
const app = express()


app.get('/ping', (_, res) => res.send('pong') )

app.get('/directory', async (_req, res) => {
  const posts = await prisma.directory.findMany()
  res.json(posts)
})


const PORT = process.env['PORT'] || 8044
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
