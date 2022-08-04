import { ICreateStudentDTO } from "../dto/ICreateStudentDTO";
import { IStudentsRepository } from "./IStudentsRepository";
import { Student } from "../entity/Student";
import { randomUUID } from 'node:crypto'

export class FakeStudentsRepository implements IStudentsRepository {
  private repository: Student[] = []

  async create({
    name,
    email,
    RA,
    CPF
  }: ICreateStudentDTO): Promise<Student> {
    const student = new Student()

    Object.assign(student, {
      id: randomUUID(),
      name,
      email,
      RA,
      CPF
    })

    this.repository.push(student)

    return student
  }

  async findByEmail(email: string): Promise<Student> {
    return this.repository.find(student => student.email === email)
  }

  async findByRA(RA: number): Promise<Student> {
    return this.repository.find(student => student.RA === RA)
  }

  async findByCPF(CPF: string): Promise<Student> {
    return this.repository.find(student => student.CPF === CPF)
  }

  async listAll(): Promise<Student[]> {
    return this.repository.map(users => users)
  }
}