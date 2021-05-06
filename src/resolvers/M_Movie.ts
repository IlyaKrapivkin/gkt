import { Arg, Mutation, Resolver } from 'type-graphql'
import { User } from '../entity/User'

@Resolver()
export class M_Movie {
  @Mutation(()=> Boolean)
  async createMovie(
    @Arg('firstName') firstName: string,
    @Arg('lastName') lastName: string,
    @Arg('age') age: number
  ) {
    await User.insert({
      firstName,
      lastName,
      age
    })
    return true
  }
}
