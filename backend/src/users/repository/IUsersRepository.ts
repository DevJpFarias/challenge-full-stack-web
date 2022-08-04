import { ICreateUserDTO } from "../dto/ICreateUserDTO";
import { User } from "../entity/User";

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>
  findByEmail(email: string): Promise<User>
  findByRA(RA: number): Promise<User>
  findByCPF(CPF: string): Promise<User>
}