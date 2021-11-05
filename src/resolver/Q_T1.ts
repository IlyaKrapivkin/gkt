import {
  Resolver,
  Query,
  Mutation,
  Authorized,
} from 'type-graphql'

@Resolver()
export default class Q_T1 {
  @Authorized()
  @Query(() => String)
  test1() {
    return 'default ok'
  }
}
