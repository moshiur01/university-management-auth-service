import express, { Application, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors'
import usersRouter from './app/modules/users/users.route'

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// application routes
app.use('/api/v1/users', usersRouter)

//testing
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to University Server')
})

export default app
