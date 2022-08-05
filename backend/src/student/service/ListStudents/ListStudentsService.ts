import { Student } from "../../entity/Student";
import { IStudentsRepository } from "../../repository/IStudentsRepository";
import { StudentsRepository } from "../../repository/StudentsRepository";

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