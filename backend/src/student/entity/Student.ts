import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  RA: number

  @Column()
  CPF: string

  @Column({ default: false })
  Inactivated: boolean
}