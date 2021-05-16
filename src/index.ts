import dotenv from 'dotenv'
import 'reflect-metadata'
import { createConnection, ConnectionOptions } from 'typeorm'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import getConfig from './ormconfig'
import { Q_Ping } from './resolvers/Q_Ping'

async function main() {
  dotenv.config()
  // db connection
  const ormconfig = getConfig()
  await createConnection(ormconfig)
  console.log(`📚 db connected`)
  // express and graphql initialization
  const app = express()
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        Q_Ping
      ]
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
