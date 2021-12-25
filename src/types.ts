export const USER_ROLE = {
  guest: 'GUEST',
  user: 'USER',
  admin: 'ADMIN',
}

export interface CustomContext {
  sessionUuid: string | null,
  operationUuid: string,
}