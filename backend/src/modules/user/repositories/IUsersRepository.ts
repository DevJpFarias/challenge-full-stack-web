import { User } from "../infra/typeorm/entity/User";
import { ICreateUserDTO } from "../dto/ICreateUserDTO";

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>
  findById(id: string): Promise<User>
}