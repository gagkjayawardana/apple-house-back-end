import express, { Express, NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import { AppDataSource } from './dataSource'
import { ErrorInterface } from './interfaces/servertypes'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes'
import cors from 'cors'
import postRoutes from './routes/postRoutes'

const app: Express = express()

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

app.listen(8080, async () => {
  console.log('Server is running at http://localhost:8080')
})
