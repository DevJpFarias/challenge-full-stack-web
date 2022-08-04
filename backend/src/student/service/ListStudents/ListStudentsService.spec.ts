import { FakeStudentsRepository } from "../../repository/FakeStudentsRepository"
import { CreateStudentService } from "../CreateStudent/CreateStudentService"
import { ListStudentsService } from "./ListStudentsService"

let fakeStudentsRepository: FakeStudentsRepository
let createStudentService: CreateStudentService
let listStudentsService: ListStudentsService

describe('List Students Test', () => {
  beforeEach(() => {
    fakeStudentsRepository = new FakeStudentsRepository()
    createStudentService = new CreateStudentService(fakeStudentsRepository)
    listStudentsService = new ListStudentsService(fakeStudentsRepository)
  })

  it('Should be able to list all students', async () => {
    const first_data = {
      name: 'João Paulo',
      email: 'joaopaulo@mail.com',
      RA: 1234,
      CPF: '999.999.999-99'
    }

    const second_data = {
      name: 'João Paulo',
      email: 'joaopaulo2@mail.com',
      RA: 4321,
      CPF: '999.888.999-88'
    }

    const first_student = await createStudentService.execute(first_data)
    const second_student = await createStudentService.execute(second_data)

    const students = await listStudentsService.execute()

    expect(students).toStrictEqual([first_student, second_student])
  })
})