import dotenv from 'dotenv'
import 'reflect-metadata'
import express from 'express'
import { createConnection } from 'typeorm'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'

import getOrmConfig from './config/ormconfig'
import { authChecker } from './auth'

async function main() {
  // environment variables
  dotenv.config()
  const port: number = +process.env.PORT || +process.env.EXPRESS_PORT

  // db connection
  const ormconfig = getOrmConfig()
  await createConnection(ormconfig)
  console.log(`📀 db connected`)

  // express and graphql initialization
  const app = express()
  const schema = await buildSchema({
    resolvers: [__dirname + '/resolver/**/*.{ts,js}'],
    authChecker,
    // authMode: 'null',
    authMode: 'error',
  })
  const apolloServer = new ApolloServer({
    schema,
    // context: ({ req, res}) => ({ req, res}),
    // context: ({ req }) => ({ headers: req.headers }),
    context: ({ req }) => ({ ...req.headers }),
    introspection: true,
    playground: true,
  })
  apolloServer.applyMiddleware({ app, path: '/graphql' })

  // start
  app.listen(port)
  console.log(`🧙‍♂️ server started on port [${port}]\n`)
}

main()
