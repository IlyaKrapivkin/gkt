import { buildSchema } from 'type-graphql'

import Q_Ping from './resolvers/Q_Ping'

export default function getSchema() {
  return buildSchema({
    resolvers: [
      Q_Ping
    ]
  }) 
}
