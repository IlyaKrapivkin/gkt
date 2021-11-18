import { IncomingHttpHeaders } from 'http'

export const USER_ROLE = {
  guest: 'GUEST',
  user: 'USER',
  admin: 'ADMIN',
}

export interface CustomContext {
  token: string | null
  uid: string
}