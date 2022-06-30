import { AuthChecker } from 'type-graphql'
import { getConnection } from 'typeorm'

import { USER_ROLE } from '../type/storage'
import { CustomContext } from '../type/abstract'

import { userAlive as sql_userAlive } from '../database/script/sql/userAlive'
import { userAliveByRole as sql_userAliveByRole } from '../database/script/sql/userAliveByRole'

export const customAuthChecker: AuthChecker<CustomContext> = async (
  { root, args, context, info },
  roles: string[],
): Promise<boolean> => {
  try {
    // GUEST
    if (roles.includes(USER_ROLE.guest)) {
      return !context.sessionUuid
    }
    // USER
    if (
      context.sessionUuid &&
      roles.includes(USER_ROLE.user)
    ) {
      const sessionTable: {
        id: number,
      }[] = await getConnection().query(
        sql_userAlive,
        [context.sessionUuid],
      )
      return !!sessionTable.length
    }
    // ADMIN
    if (
      context.sessionUuid &&
      roles.includes(USER_ROLE.admin)
    ) {
      const sessionTable: {
        id: number,
      }[] = await getConnection().query(
        sql_userAliveByRole,
        [
          context.sessionUuid,
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