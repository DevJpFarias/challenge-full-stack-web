import { Router } from 'express'

import { studentRouter } from '../../modules/student/infra/http/routes/student.routes'
import { userRouter } from '../../modules/user/infra/http/routes/users.routes'

export const routes = Router()

routes.use('/students', studentRouter)
routes.use('/users', userRouter)