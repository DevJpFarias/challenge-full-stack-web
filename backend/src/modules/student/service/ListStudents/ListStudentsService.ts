import { Student } from "../../infra/typeorm/entity/Student";
import { IStudentsRepository } from "../../repositories/IStudentsRepository";
import { StudentsRepository } from "../../infra/typeorm/repositories/StudentsRepository";

export class ListStudentsService {
  private studentsRepository: IStudentsRepository

  constructor(repository: IStudentsRepository) {
    this.studentsRepository = repository
    
    if(!repository) {
      this.studentsRepository = new StudentsRepository()
    }
  }

  async execute(): Promise<Student[]> {
    const students = await this.studentsRepository.listAll()

    return students
  }
}