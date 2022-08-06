import { FakeUsersRepository } from "../../repositories/fakes/FakeUsersRepository"
import { CreateUserService } from "./CreateUserService"

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
      password: 'fulaninho'
    }

    const user = await createUserService.execute(data)

    expect(user).toHaveProperty('id')
    expect(user).toHaveProperty('isAdmin', false)
    expect(user).toHaveProperty('inactivated', false)
  })
})