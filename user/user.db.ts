import { SQLDatabase } from 'encore.dev/storage/sqldb'
import knex from 'knex'
import { User } from './user.types'

export const UserDB = new SQLDatabase('user', {
  migrations: './migrations',
})

const orm = knex({
  client: 'pg',
  connection: UserDB.connectionString,
})

export const Users = () => orm<User>('users')
