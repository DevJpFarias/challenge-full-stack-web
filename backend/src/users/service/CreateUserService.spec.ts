import { CreateUserService } from "./CreateUserService"
import { FakeUsersRepository } from "../repository/FakeUsersRepository"
import { AppError } from "../../AppError"

let fakeUsersRepository: FakeUsersRepository
let createUserService: CreateUserService

describe('Create User Test', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    createUserService = new CreateUserService(fakeUsersRepository)
  })

  it('Should be able to create a new user', async () => {
    const data = {
      name: 'Fulano',
      email: 'fulano@mail.com',
      RA: 99999999,
      CPF: '000.000.000-00'
    }

    const user = await createUserService.execute(data)

    expect(user).toHaveProperty('id')
  })

  it('Should not be able to create a new user with an existent email', async () => {
    expect(async () => {
      const first_data = {
        name: 'João Paulo',
        email: 'joaopaulo@mail.com',
        RA: 1234,
        CPF: '999.999.999-99'
      }

      const second_data = {
        name: 'João Paulo',
        email: 'joaopaulo@mail.com',
        RA: 4321,
        CPF: '999.888.999-88'
      }

      await createUserService.execute(first_data)
      await createUserService.execute(second_data)

    }).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to create a new user with an existent RA', async () => {
    expect(async () => {
      const first_data = {
        name: 'João Paulo',
        email: 'joaopaulo@mail.com',
        RA: 1234,
        CPF: '999.999.999-99'
      }

      const second_data = {
        name: 'João Paulo',
        email: 'joaopaulo2@mail.com',
        RA: 1234,
        CPF: '999.888.999-88'
      }

      await createUserService.execute(first_data)
      await createUserService.execute(second_data)

    }).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to create a new user with an existent CPF', async () => {
    expect(async () => {
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
        CPF: '999.999.999-99'
      }

      await createUserService.execute(first_data)
      await createUserService.execute(second_data)

    }).rejects.toBeInstanceOf(AppError)
  })
})