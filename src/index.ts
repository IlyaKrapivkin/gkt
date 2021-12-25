import dotenv from 'dotenv'
import 'reflect-metadata'
import express from 'express'
import { createConnection } from 'typeorm'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { GraphQLError } from 'graphql'

import getOrmConfig from './config/ormconfig'
import { CustomContext } from './types'
import { customAuthChecker } from './utility/Auth'
import { UuidGen } from './utility/Crypt'
import { Lifecycle } from './utility/Lifecycle'

async function main() {
  // environment variables
  dotenv.config()
  const port: number = +process.env.PORT || +process.env.EXPRESS_PORT

  // db connection
  const ormconfig = getOrmConfig()
  await createConnection(ormconfig)
  console.log(`📜 db connected`)

  // express and graphql initialization
  const app = express()
  const schema = await buildSchema({
    resolvers: [__dirname + '/resolver/**/*.{ts,js}'],
    authChecker: customAuthChecker,
    authMode: 'error',
  })
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => {
      const tokenRaw = req?.headers?.token || null
      const tokenStr = (
        tokenRaw &&
        typeof tokenRaw === 'string'
      ) ? tokenRaw : null
      const context: CustomContext = {
        token: tokenStr,
        uuid: UuidGen(),
      }
      return context
    },
    introspection: true,
    formatError: (err) => {
      console.error(err)
      const errorReplaced: GraphQLError = {
        message: err.message,
        nodes: undefined,
        source: undefined,
        positions: undefined,
        path: undefined,
        originalError: undefined,
        extensions: undefined,
        locations: undefined,
        name: undefined,
      }
      return errorReplaced
    },
    formatResponse: (res) => (res),
    plugins: [
      Lifecycle,
    ]
  })
  await  apolloServer.start()
  apolloServer.applyMiddleware({ app, path: '/graphql' })

  // start
  app.listen(port)
  console.log(`🧙‍♂️ server started on port [${port}]\n`)
}

main()
