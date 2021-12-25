import { AuthChecker } from 'type-graphql'
import { getConnection } from 'typeorm'

import {
  CustomContext,
  USER_ROLE,
} from '../types'
import { userAlive as sql_userAlive } from '../db/sql/userAlive'
import { userAliveByRole as sql_userAliveByRole } from '../db/sql/userAliveByRole'

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