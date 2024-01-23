import express, { Express, NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import { AppDataSource } from './dataSource'
import { ErrorInterface } from './interfaces/servertypes'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes'
import cors from 'cors'
import postRoutes from './routes/postRoutes'
import commentRoutes from './routes/commentRoutes'

import { createServer } from 'http'
import { Server } from 'socket.io'

const app: Express = express()
const httpServer = createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000/',
    methods: ['GET', 'POST', 'PUT']
  }
})

io.on('connection', (socket) => {
  console.log(`User connect ${socket.id}`)

  socket.on('post_add', (data) => {
    socket.broadcast.emit('post_added', data)
  })

  socket.on('approve_post', (data) => {
    socket.broadcast.emit('approved_post', data)
  })

  socket.on('reject_post', (data) => {
    socket.broadcast.emit('rejected_post', data)
  })

  socket.on('add_comment', (data) => {
    socket.broadcast.emit('comment_added', data)
  })
})

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!')
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err)
  })

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(cookieParser())

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000', 'your-production-domain']
  })
)

app.use('/user', userRoutes)
app.use('/post', postRoutes)
app.use('/comment', commentRoutes)

app.use((req: Request, res: Response, next: NextFunction) => {
  const err: ErrorInterface = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err: ErrorInterface, req: Request, res: Response) => {
  res.status(err.status || 500)
  res.json({
    err: {
      message: err.message
    }
  })
})

httpServer.listen(8080, async () => {
  console.log('Server is running at http://localhost:8080')
})
