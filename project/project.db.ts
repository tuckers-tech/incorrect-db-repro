import { SQLDatabase } from 'encore.dev/storage/sqldb'
import knex from 'knex'

import { Project } from './project.types'

export const ProjectDB = new SQLDatabase('project', {
  migrations: './migrations',
})

const orm = knex({
  client: 'pg',
  connection: ProjectDB.connectionString,
})

export const Projects = () => orm<Project>('projects')
