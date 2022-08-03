import { Request, Response } from "express";
import { UsersRepository } from "../repository/UsersRepository";

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, RA, CPF } = request.body

    const repository = new UsersRepository()

    const user = await repository.create({
      name,
      email,
      RA,
      CPF
    })

    return response.status(201).json(user)
  }
}