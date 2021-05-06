import { Query, Resolver } from 'type-graphql'

@Resolver()
export class Q_Ping {
  @Query(() => String)
  ping() {
    return 'pong'
  }
}
