import { User } from "../entity/User";
import { ICreateUserDTO } from "../dto/ICreateUserDTO";
import { IUsersRepository } from "../repository/IUsersRepository";
import { UsersRepository } from "../repository/UsersRepository";
import { AppError } from "../../AppError";

export class CreateUserService {
  private usersRepository: IUsersRepository

  constructor(repository: IUsersRepository) {
    this.usersRepository = repository
    if(!repository) {
      this.usersRepository = new UsersRepository()
    }
  }

  async execute({
    name,
    email,
    RA,
    CPF
  }: ICreateUserDTO): Promise<User> {
    const findUserByEmail = await this.usersRepository.findByEmail(email)

    if(findUserByEmail) throw new AppError('This email is already used')

    const findUserByRA = await this.usersRepository.findByRA(RA)

    if(findUserByRA) throw new AppError('This RA already exists')

    const user = await this.usersRepository.create({
      name,
      email,
      RA,
      CPF
    })

    return user
  }
}