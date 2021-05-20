import dotenv from 'dotenv'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'

import getOrmConfig from './config/ormconfig'

async function main() {
  dotenv.config()
  // db connection
  const ormconfig = getOrmConfig()
  await createConnection(ormconfig)
  console.log(`📚 db connected`)
  // express and graphql initialization
  const app = express()
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [__dirname + '/resolver/**/*.{ts,js}']
    }),
    context: ({ req, res}) => ({ req, res}),
    introspection: true,
    playground: true
  })
  apolloServer.applyMiddleware({ app, path: '/graphql' })
  const port: number = +process.env.PORT || +process.env.EXPRESS_PORT
  app.listen(port)
  console.log(`🚀 server started on port [${port}]`)
}

main()
