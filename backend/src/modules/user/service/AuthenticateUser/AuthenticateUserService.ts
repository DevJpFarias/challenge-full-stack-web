import { AppError } from "../../../../shared/errors/AppError"
import { User } from "../../infra/typeorm/entity/User"
import { UsersRepository } from "../../infra/typeorm/repositories/UsersRepository"
import { IUsersRepository } from "../../repositories/IUsersRepository"
import { compare } from 'bcrypt'
import { sign } from "jsonwebtoken"

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User,
  token: string
}

export class AuthenticateUserService {
  private usersRepository: IUsersRepository

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository

    if(!usersRepository) this.usersRepository = new UsersRepository()
  }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if(!user) throw new AppError('Incorrect email or password')

    const passwordCompare = await compare(password, user.password)

    if(!passwordCompare) throw new AppError('Incorrect email or password')

    const token = sign({}, '5344b9b3d41d46dbf752863bcd11789e', {
      subject: user.id,
      expiresIn: '1d'
    })

    return {
      user,
      token
    }
  }
}