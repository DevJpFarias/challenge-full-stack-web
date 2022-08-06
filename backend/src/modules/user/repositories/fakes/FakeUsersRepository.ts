import { User } from "../../infra/typeorm/entity/Entity";
import { ICreateUserDTO } from "../../dto/ICreateUserDTO";
import { IUsersRepository } from "../IUsersRepository";
import { randomUUID } from "crypto";

export class FakeUsersRepository implements IUsersRepository {
  private repository: User[] = []
  
  async create({
    name,
    email,
    password
  }: ICreateUserDTO): Promise<User> {
    const user = new User()

    Object.assign(user, {
      id: randomUUID(),
      name,
      email,
      password,
      isAdmin: false,
      inactivated: false
    })

    this.repository.push(user)

    return user
  }

  async findById(id: string): Promise<User> {
    return this.repository.find(user => user.id === id)
  }
}