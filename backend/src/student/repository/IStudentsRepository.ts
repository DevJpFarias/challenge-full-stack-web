import { ICreateStudentDTO } from "../dto/ICreateStudentDTO";
import { Student } from "../entity/Student";

export interface IStudentsRepository {
  create(data: ICreateStudentDTO): Promise<Student>
  findByEmail(email: string): Promise<Student>
  findByRA(RA: number): Promise<Student>
  findByCPF(CPF: string): Promise<Student>
  listAll(): Promise<Student[]>
}