import {
  Resolver,
  Query,
  Mutation,
  Authorized,
  Arg,
} from 'type-graphql'
import { USER_ROLE } from '../types'

@Resolver()
export default class Auth {
  @Authorized([
    USER_ROLE.guest,
  ])
  @Mutation(() => String)
  async signUp(
    @Arg('roleId') roleId: number,
    @Arg('login') login: string,
    @Arg('loginReserve', { nullable: true }) loginReserve?: string,
  ): Promise<string> {
    // TODO
    return 'default ok'
  }

  @Authorized([
    USER_ROLE.guest,
  ])
  @Mutation(() => Boolean)
  async signIn(): Promise<boolean> {
    // TODO
    return false
  }

  @Authorized([
    USER_ROLE.user,
    USER_ROLE.admin,
  ])
  @Mutation(() => Boolean)
  async signOut(): Promise<boolean> {
    // TODO
    return false
  }
}
