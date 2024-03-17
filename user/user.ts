import { api } from 'encore.dev/api'
import { APIError } from 'encore.dev/errs'

import { PGError } from '../common/errors'

import { User } from './user.types'
import { Users } from './user.db'
import { UserSignUp } from './user.events'

export interface CreateUserParams {
  first_name: string
  last_name: string
  email: string
}

export const create = api(
  { expose: false, method: 'POST', path: '/users' },
  async ({ first_name, last_name, email }: CreateUserParams): Promise<User> => {
    try {
      const newUser = (await Users().insert({ first_name, last_name, email }, '*'))[0]

      UserSignUp.publish({ user: newUser })

      return newUser
    } catch (err) {
      const error = err as PGError
      // error 23505 is unique constraint enforcement
      if (error.code === '23505') {
        throw APIError.alreadyExists(`User with email: ${email} already exists`, err as PGError)
      } else {
        throw error
      }
    }
  },
)
