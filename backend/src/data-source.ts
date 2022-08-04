import "reflect-metadata"
import { DataSource } from "typeorm"
import { Student } from "./student/entity/Student"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "admin",
    password: "admin",
    database: "challenge-full-stack-web",
    entities: [Student],
    migrations: [
        'src/migration/*.ts'
    ]
})
