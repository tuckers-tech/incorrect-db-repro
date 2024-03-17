import { api } from 'encore.dev/api'
import { Projects } from './project.db'
import { type Project } from './project.types'

export interface CreateProjectParams {
  name: string
}

export const create = api(
  { expose: true, method: 'POST', path: '/projects' },
  async ({ name }: CreateProjectParams): Promise<Project> => {
    const newProject = (
      await Projects().insert(
        {
          name,
          owner: 1,
        },
        '*',
      )
    )[0]

    return newProject
  },
)
