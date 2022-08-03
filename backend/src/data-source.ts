import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./users/entity/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "admin",
    password: "admin",
    database: "challenge-full-stack-web",
    synchronize: true,
    entities: [User],
    migrations: [
        'src/migration/*.ts'
    ]
})
