import { AuthChecker } from 'type-graphql'
import { getConnection } from 'typeorm'
import crypto from 'crypto'

import {
  CustomContext,
  USER_ROLE,
} from './types'
import { userAlive as sql_userAlive } from './script/sql/userAlive'
import { userAliveByRole as sql_userAliveByRole } from './script/sql/userAliveByRole'

export const uidGen = () => {
  return crypto.randomUUID()
}

export const tokenGen = () => {
  const value = `${new Date().valueOf()}${Math.random()}`
  return crypto.createHash('sha1').update(value, 'utf8').digest('hex')
}

export const hashGen = (
  login: string,
  password: string,
) => {
  if (login && password) {
    const value = login + password
    return crypto.createHash('sha256').update(value, 'utf8').digest('hex')
  }
  return null
}

export const hashCheck = (
  hash: string,
  login: string,
  password: string,
) => {
  if (hash && login && password) {
    const hashNew = hashGen(
      login,
      password,
    )
    return hash === hashNew
  }
  return false
}

export const customAuthChecker: AuthChecker<CustomContext> = async (
  { root, args, context, info },
  roles: string[],
) => {
  try {
    // GUEST
    if (roles.includes(USER_ROLE.guest)) {
      return !context.token
    }
    // USER
    if (
      context.token &&
      roles.includes(USER_ROLE.user)
    ) {
      const sessionTable: {
        id: number,
      }[] = await getConnection().query(
        sql_userAlive,
        [context.token],
      )
      return !!sessionTable.length
    }
    // ADMIN
    if (
      context.token &&
      roles.includes(USER_ROLE.admin)
    ) {
      const sessionTable: {
        id: number,
      }[] = await getConnection().query(
        sql_userAliveByRole,
        [
          context.token,
          USER_ROLE.admin,
        ],
      )
      return !!sessionTable.length
    }
    // default
    return false
  } catch (catErr) {
    return false
  }
}