import { AppError } from "../../../../shared/errors/AppError"
import { FakeUsersRepository } from "../../../user/repositories/fakes/FakeUsersRepository"
import { CreateUserService } from "../../../user/service/createUser/CreateUserService"
import { FakeStudentsRepository } from "../../repositories/fakes/FakeStudentsRepository"
import { CreateStudentService } from "../CreateStudent/CreateStudentService"
import { UpdateStudentService } from "./UpdateStudentService"

let fakeStudentsRepository: FakeStudentsRepository
let fakeUsersRepository: FakeUsersRepository
let createStudentsService: CreateStudentService
let createUserService: CreateUserService
let updateStudentService: UpdateStudentService

describe('Update Student Test', () => {
  beforeEach(() => {
    fakeStudentsRepository = new FakeStudentsRepository()
    fakeUsersRepository = new FakeUsersRepository()
    createStudentsService = new CreateStudentService(fakeStudentsRepository, fakeUsersRepository)
    createUserService = new CreateUserService(fakeUsersRepository, fakeStudentsRepository)
    updateStudentService = new UpdateStudentService(fakeStudentsRepository, fakeUsersRepository)
  })

  it('Should be able to update a student', async () => {
    const data = {
      name: 'Fulano',
      email: 'fulano@mail.com',
      RA: 9999,
      CPF: '000.000.000-00'
    }

    const student = await createStudentsService.execute(data)

    const update_data = {
      id: student.id,
      name: 'João Paulo',
      email: 'joaopaulo@mail.com',
    }

    const update_student = await updateStudentService.execute(
      update_data.id,
      update_data.name,
      update_data.email
      )

    expect(student).toBe(update_student)
  })

  it('Should not be able to update a nonexistent student', async () => {
    expect(async () => {
      const update_data = {
        id: '12345',
        name: 'João Paulo',
        email: 'joaopaulo@mail.com',
      }
  
      await updateStudentService.execute(
        update_data.id,
        update_data.name,
        update_data.email
      )
    }).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to update the email of student if this email is already used', async () => {
    expect(async () => {
      const first_data = {
        name: 'João Paulo',
        email: 'joaopaulo@mail.com',
        RA: 1234,
        CPF: '999.888.999-99'
      }

      const second_data = {
        name: 'João Paulo',
        email: 'joaopaulo2@mail.com',
        RA: 4321,
        CPF: '999.999.999-99'
      }

      const first_student = await createStudentsService.execute(first_data)
      const second_student = await createStudentsService.execute(second_data)

      const update_data = {
        id: first_student.id,
        name: 'João Paulo',
        email: second_student.email
      }

      await updateStudentService.execute(
        update_data.id,
        update_data.name,
        update_data.email
      )
    
    }).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to update the email of student if this email is already used (user)', async () => {
    expect(async () => {
      const user_data = {
        name: 'Fulano',
        email: 'fulano@mail.com',
        password: '12345'
      }

      const student_data = {
        name: 'João Paulo',
        email: 'joaopaulo2@mail.com',
        RA: 4321,
        CPF: '999.999.999-99'
      }

      const user = await createUserService.execute(user_data)
      const student = await createStudentsService.execute(student_data)

      const update_data = {
        id: student.id,
        name: 'João Paulo',
        email: user.email
      }

      await updateStudentService.execute(
        update_data.id,
        update_data.name,
        update_data.email
      )
    
    }).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to send RA to be updated', async () => {
    expect(async () => {
      const data = {
        name: 'Fulano',
        email: 'fulano@mail.com',
        RA: 9999,
        CPF: '000.000.000-00'
      }
  
      const student = await createStudentsService.execute(data)

      const update_data = {
        id: student.id,
        name: 'João Paulo',
        email: 'joaopaulo@mail.com',
        RA: 9999
      }
  
      await updateStudentService.execute(
        update_data.id,
        update_data.name,
        update_data.email,
        update_data.RA
      )
    }).rejects.toBeInstanceOf(AppError)
  })
})