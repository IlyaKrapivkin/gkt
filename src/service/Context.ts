import express from 'express'
import { ExpressContext } from 'apollo-server-express'

import { CustomContext } from '../type/abstract'
import { UuidGen } from '../tool/Crypt'

export const ContextFormatter = (
  expressContext: ExpressContext,
): CustomContext => {
  const curDate = new Date
  const tokenRaw = expressContext?.req?.headers?.token || null
  const tokenStr = (
    tokenRaw &&
    typeof tokenRaw === 'string'
  ) ? tokenRaw : null
  const contextNew: CustomContext = {
    sessionUuid: tokenStr,
    operationUuid: UuidGen(),
    operationStart: curDate,
  }
  return contextNew
}