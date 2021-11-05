import {
  Resolver,
  Query,
  Mutation,
  Authorized,
} from 'type-graphql'

@Resolver()
export default class Q_T2 {
  @Authorized()
  @Query(() => String)
  test2() {
    throw new Error('wanna error')
  }
}
