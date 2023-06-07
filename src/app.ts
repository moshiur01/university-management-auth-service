import express, { Application, NextFunction, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors'
import usersRouter from './app/modules/users/users.route'
import globalErrorHandler from './app/middleware/globalErrorHandler'

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// application routes
app.use('/api/v1/users', usersRouter)

// //testing
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   //throw new ApiError(400, 'ulala')
//   next('ulala')
// })

//global error handler
app.use(globalErrorHandler)
export default app
