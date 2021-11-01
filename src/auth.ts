import { AuthChecker } from 'type-graphql'
import { getConnection } from 'typeorm'
import { Request } from 'express'
import crypto from 'crypto'

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

export const authChecker: AuthChecker<Request> = async (
  {
    // root,
    // args,
    context,
    // info,
  },
  roles,
) => {
  try {
    console.log(context)
    let reqToken: string | null = null
    if (context.headers.token) {
      if (Array.isArray(context.headers.token)) {
        reqToken = context.headers.token?.[0]
      } else {
        reqToken = context.headers.token
      }
    }
    if (!reqToken) {
      return false
    }
    const sql_getTokenAlive = `select * from public.session where token = $1`
    const tokenTab: {
      account_id: number,
    }[] = await getConnection().query(
      sql_getTokenAlive,
      [reqToken],
    )
    return !!(tokenTab && tokenTab.length)
  } catch (cerror) {
    return false
  }
}