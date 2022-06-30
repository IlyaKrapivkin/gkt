import 'reflect-metadata'
import dotenv from 'dotenv'
import express from 'express'
import { createConnection } from 'typeorm'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'

import { getOrmConfig } from './database/orm/ormconfig'
import { customAuthChecker } from './service/Auth'
import { Lifecycle } from './service/Lifecycle'
import { ContextFormatter } from './service/Context'
import { ErrorFormatter } from './service/Error'
import { ResponseFormatter } from './service/Response'

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
    resolvers: [__dirname + '/client/resolver/**/*.{ts,js}'],
    authChecker: customAuthChecker,
    authMode: 'error',
  })
  const apolloServer = new ApolloServer({
    schema,
    context: ContextFormatter,
    introspection: true,
    formatError: ErrorFormatter,
    formatResponse: ResponseFormatter,
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
