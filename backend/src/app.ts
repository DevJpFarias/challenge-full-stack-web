import 'reflect-metadata'
import 'express-async-errors'
import express, { NextFunction, Request, Response } from 'express'
import { studentRouter } from './modules/student/infra/http/routes/student.routes'
import { AppDataSource } from './shared/connections/data-source'
import { AppError } from './shared/errors/AppError'

AppDataSource.initialize()

const app = express()

app.use(express.json())

app.use(studentRouter)

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
	if(err instanceof AppError) {
		return response.status(err.statusCode).json({
			status: 'error',
			message: err.message,
		})
	}

	console.log(err)

	return response.status(500).json({
		status: 'error',
		message: 'Internal Server Error',
	})
})

export { app }