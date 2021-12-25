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
import { ContextFormatter } from './utility/Context'
import { ErrorFormatter } from './utility/Error'

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
    context: ContextFormatter,
    introspection: true,
    formatError: ErrorFormatter,
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
