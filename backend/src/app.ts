import 'reflect-metadata'
import express from 'express'
import { userRouter } from './routes/users.routes'
import { AppDataSource } from './data-source'

AppDataSource.initialize()

const app = express()

app.use(express.json())

app.use(userRouter)

export { app }