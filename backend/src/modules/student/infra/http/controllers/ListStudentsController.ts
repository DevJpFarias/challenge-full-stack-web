import { Request, Response } from "express";
import { StudentsRepository } from "../../typeorm/repositories/StudentsRepository";
import { ListStudentsService } from "../../../service/ListStudents/ListStudentsService";
import { instanceToInstance } from "class-transformer";

const studentsRepository = new StudentsRepository()

export class ListStudentsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listStudentsService = new ListStudentsService(studentsRepository)

    const students = await listStudentsService.execute()

    return response.status(200).json({students: instanceToInstance(students)})
  }
}