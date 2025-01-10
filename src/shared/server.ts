import express from 'express'
import http from 'http'

import { Server } from 'socket.io'
import { appRouter } from './routes'
import path from 'path'
import url from 'url'

const app = express()
const port = process.env.PORT || 3000

const currentPath = url.fileURLToPath(import.meta.url)
const publicDir = path.join(currentPath, '../..', 'tmp')

app.use(express.json())
app.use(express.static(publicDir))
app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'API is running!',
  })
})
app.use(appRouter)

// Default config to Socket.io working with Express
const serverHttp = http.createServer(app)
const io = new Server(serverHttp)

serverHttp.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`),
)

export { io }
