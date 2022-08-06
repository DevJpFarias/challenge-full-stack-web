import { ICreateStudentDTO } from "../../dto/ICreateStudentDTO";
import { IStudentsRepository } from "../IStudentsRepository";
import { Student } from "../../infra/typeorm/entity/Student";
import { randomUUID } from 'node:crypto'
import { IUpdateStudentDTO } from "../../dto/IUpdateStudentDTO";

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
      CPF,
      inactivated: false
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
    const students = this.repository.filter(student => student.inactivated === false)

    return students
  }

  async update({id, name, email}: IUpdateStudentDTO): Promise<Student> {
    const studentIndex = this.repository.findIndex(student => student.id === id)

    this.repository[studentIndex].name = name
    this.repository[studentIndex].email = email

    const student = this.repository.find(student => student.id === id)

    return student
  }

  async findById(id: string): Promise<Student> {
    return this.repository.find(student => student.id === id)
  }

  async inactivate(student: Student): Promise<void> {
    const studentIndex = this.repository.findIndex(delete_student => delete_student.id === student.id)

    this.repository[studentIndex].inactivated = true
  }
}