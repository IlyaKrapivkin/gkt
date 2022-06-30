import crypto from 'crypto'

export const UuidGen = (): string => {
  return crypto.randomUUID()
}

export const TokenGen = (): string => {
  const value = `${new Date().valueOf()}${Math.random()}`
  return crypto.createHash('sha1').update(value, 'utf8').digest('hex')
}

export const HashGen = (
  login: string,
  password: string,
): string => {
  if (login && password) {
    const value = login + password
    return crypto.createHash('sha256').update(value, 'utf8').digest('hex')
  }
  return null
}

export const HashCheck = (
  hash: string,
  login: string,
  password: string,
): boolean => {
  if (hash && login && password) {
    const hashNew = HashGen(
      login,
      password,
    )
    return hash === hashNew
  }
  return false
}