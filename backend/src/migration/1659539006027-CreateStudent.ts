import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateStudent1659539006027 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(
            new Table({
                name: 'students',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
						default: 'uuid_generate_v4()'
                    },
                    {
                        name: 'name',
                        type: 'varchar'
                    },
                    {
                        name: 'email',
                        type: 'varchar'
                    },
                    {
                        name: 'RA',
                        type: 'numeric'
                    },
                    {
                        name: 'CPF',
                        type: 'varchar'
                    },
                    {
                        name: 'Inactivated',
                        type: 'boolean',
                        default: false
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('students')
    }

}
