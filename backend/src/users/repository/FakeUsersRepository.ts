import { ICreateUserDTO } from "../dto/ICreateUserDTO";
import { IUsersRepository } from "./IUsersRepository";
import { User } from "../entity/User";
import { randomUUID } from 'node:crypto'

export class FakeUsersRepository implements IUsersRepository {
  private repository: User[] = []

  async create({
    name,
    email,
    RA,
    CPF
  }: ICreateUserDTO): Promise<User> {
    const user = new User()

    Object.assign(user, {
      id: randomUUID(),
      name,
      email,
      RA,
      CPF
    })

    this.repository.push(user)

    return user
  }

  async findByEmail(email: string): Promise<User> {
    return this.repository.find(user => user.email === email)
  }
}