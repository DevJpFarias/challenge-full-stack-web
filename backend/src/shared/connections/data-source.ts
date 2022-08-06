import "reflect-metadata"
import { DataSource } from "typeorm"
import { Student } from "../../modules/student/infra/typeorm/entity/Student"
import { User } from "../../modules/user/infra/typeorm/entity/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "admin",
    password: "admin",
    database: "challenge-full-stack-web",
    entities: [Student, User],
    migrations: [
        'src/shared/migrations/*.ts'
    ]
})
