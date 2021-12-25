import express from 'express'
import { ContextFunction } from 'apollo-server-core'
import { ExpressContext } from 'apollo-server-express'

import { UuidGen } from './Crypt'

export interface CustomContext {
  sessionUuid: string | null,
  operationUuid: string,
}

export const ContextFormatter: ContextFunction<ExpressContext, object> = (
  { req, res },
) => {
  const tokenRaw = req?.headers?.token || null
  const tokenStr = (
    tokenRaw &&
    typeof tokenRaw === 'string'
  ) ? tokenRaw : null
  const context: CustomContext = {
    sessionUuid: tokenStr,
    operationUuid: UuidGen(),
  }
  return context
}