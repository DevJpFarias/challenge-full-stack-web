import "reflect-metadata"
import { DataSource } from "typeorm"
import { Student } from "../../modules/student/infra/typeorm/entity/Student"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "admin",
    password: "admin",
    database: "challenge-full-stack-web",
    entities: [Student],
    migrations: [
        'src/shared/migrations/*.ts'
    ]
})
