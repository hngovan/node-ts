import cors from 'cors'
import express, { Application, Request, Response, NextFunction } from 'express'
import 'dotenv/config'
import createHttpError from 'http-errors'

const app: Application = express()

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ['POST', 'GET', 'PUT', 'DELETE']
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
  return res.json({
    success: true,
    message: 'hello world'
  })
})

app.use((req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(404))
})

// Error handler
const errorHandler = (err: createHttpError.HttpError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500)
  res.json({
    status: err.status || 500,
    message: err.message
  })
}

app.use(errorHandler)

const PORT = process.env.PORT || 8888

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`)
})
