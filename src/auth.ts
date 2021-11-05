import { AuthChecker } from 'type-graphql'
import { IncomingHttpHeaders } from 'http'
import { getConnection } from 'typeorm'
import { Request } from 'express'
import crypto from 'crypto'

export interface Context extends IncomingHttpHeaders {
  token?: string
}

const tokenGen = () => {
  const value = `${new Date().valueOf()}${Math.random()}`
  return crypto.createHash('sha1').update(value, 'utf8').digest('hex')
}

const hashGen = (
  login: string,
  password: string,
) => {
  if (login && password) {
    const value = login + password
    return crypto.createHash('sha256').update(value, 'utf8').digest('hex')
  }
  return null
}

const hashCheck = (
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

export const authChecker: AuthChecker<Context> = async (
  { root, args, context, info },
  roles,
) => {
  try {
    console.log('context', context)
    return !!context.token
  } catch (cerror) {
    return false
  }
}