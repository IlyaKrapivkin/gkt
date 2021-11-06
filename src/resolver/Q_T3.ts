import {
  Resolver,
  Query,
  Mutation,
  Authorized,
} from 'type-graphql'

@Resolver()
export default class Q_T3 {
  @Authorized()
  @Query(() => String)
  test3() {
    const abc = undefined
    const cba = abc.def
    return 'code error'
  }
}
