import 'reflect-metadata'
import { createConnection, ConnectionOptions } from 'typeorm'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import getConfig from './ormconfig'
import { Q_Ping } from './resolvers/Q_Ping'
import { M_Movie } from './resolvers/M_Movie'

async function main() {
  // db connection
  const ormconfig = getConfig()
  await createConnection(ormconfig)
  console.log('📚 db connected')
  // express initialization
  const port: number = 3000
  const app = express()
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        Q_Ping,
        M_Movie
      ]
    }),
    context: ({ req, res}) => ({ req, res})
  })
  apolloServer.applyMiddleware({ app, path: '/graphql' })
  app.listen(port)
  console.log('🚀 server started')
}
main()


