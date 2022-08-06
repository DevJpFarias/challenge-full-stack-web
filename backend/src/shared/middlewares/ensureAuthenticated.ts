import { NextFunction, Request, Response } from 'express'
import { AppError } from '../errors/AppError'
import { verify } from 'jsonwebtoken'
import { UsersRepository } from '../../modules/user/infra/typeorm/repositories/UsersRepository'

interface IPayload {
	sub: string
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
	const authHeader = request.headers.authorization

	if(!authHeader) throw new AppError('Token Missing!', 401)

	const [, token] = authHeader.split(' ')

	try {
		const { sub: user_id } = verify(token, '5344b9b3d41d46dbf752863bcd11789e') as IPayload
		
		const usersRepository = new UsersRepository()
		const user = await usersRepository.findById(user_id)

		if(!user) throw new AppError('User not exists!')

		request.user = {
			id: user_id
		}

		return next()
	} catch (error) {
		throw new AppError('Invalid Token!')
	}	
}