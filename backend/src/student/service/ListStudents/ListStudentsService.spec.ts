import { FakeStudentsRepository } from "../../repository/FakeStudentsRepository"
import { CreateStudentService } from "../CreateStudent/CreateStudentService"
import { InactivateStudentService } from "../InactivateStudent/InactivateStudentService"
import { ListStudentsService } from "./ListStudentsService"

let fakeStudentsRepository: FakeStudentsRepository
let createStudentService: CreateStudentService
let listStudentsService: ListStudentsService
let inactivateStudentService: InactivateStudentService

describe('List Students Test', () => {
  beforeEach(() => {
    fakeStudentsRepository = new FakeStudentsRepository()
    createStudentService = new CreateStudentService(fakeStudentsRepository)
    listStudentsService = new ListStudentsService(fakeStudentsRepository)
    inactivateStudentService = new InactivateStudentService(fakeStudentsRepository)
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

  it('Should not be able to list inactivated students', async () => {
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

    await inactivateStudentService.execute(second_student.id)

    const students = await listStudentsService.execute()

    expect(students).toStrictEqual([first_student])
  })
})