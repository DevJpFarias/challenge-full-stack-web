import { instanceToInstance } from "class-transformer";
import { Request, Response } from "express";
import { AuthenticateUserService } from "../../../service/AuthenticateUser/AuthenticateUserService";
import { UsersRepository } from "../../typeorm/repositories/UsersRepository";

const usersRepository = new UsersRepository()

export class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const authenticateUserService = new AuthenticateUserService(usersRepository)

    const authenticate = await authenticateUserService.execute({
      email,
      password
    })

    return response.status(200).json({authenticate: instanceToInstance(authenticate)})
  }
}