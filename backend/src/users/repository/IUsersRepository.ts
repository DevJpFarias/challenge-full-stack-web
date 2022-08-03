import { ICreateUserDTO } from "../dto/ICreateUserDTO";
import { User } from "../entity/User";

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>
  findByEmail(email: string): Promise<User>
}