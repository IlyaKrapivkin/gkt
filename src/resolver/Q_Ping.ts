import {
  Resolver,
  Query,
  Mutation,
  Authorized,
} from 'type-graphql'

@Resolver()
export default class Q_Ping {
  @Query(() => String)
  ping() {
    return 'pong'
  }
}
