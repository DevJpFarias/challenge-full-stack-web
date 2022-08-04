import { Request, Response } from "express";
import { UsersRepository } from "../repository/UsersRepository";
import { CreateUserService } from "../service/CreateUserService";

const usersRepository = new UsersRepository()

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, RA, CPF } = request.body

    const createUserService = new CreateUserService(usersRepository)

    const user = await createUserService.execute({
      name,
      email,
      RA,
      CPF
    })

    return response.status(201).json(user)
  }
}