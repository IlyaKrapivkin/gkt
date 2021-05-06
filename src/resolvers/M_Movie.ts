import { Arg, Mutation, Resolver } from 'type-graphql'

@Resolver()
export class M_Movie {
  @Mutation(()=> Boolean)
  createMovie(
    @Arg('title') title: string
  ) {
    console.log(title)
    return true
  }
}
