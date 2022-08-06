import { hash } from 'bcrypt'
import { randomUUID } from 'crypto'
import { AppDataSource } from '../connections/data-source'

async function create() {
	const connection = await AppDataSource.initialize()

	const id = randomUUID()
	const password = await hash('admin', 8)

	await connection.query(`
    INSERT INTO USERS(id, name, email, password, "isAdmin", inactivated)
    values('${id}', 'Admin', 'admin@mail.com.br', '${password}', 'true', 'false')
  `)

	await connection.destroy()
}

create().then(() => console.log('User admin created!'))