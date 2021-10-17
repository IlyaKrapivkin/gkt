import { AuthChecker } from 'type-graphql'
import { Request } from 'express'

export const authChecker: AuthChecker<Request> = (
  {
    // root,
    // args,
    context,
    // info,
  },
  roles,
) => {
  console.log(context)
  return true
}