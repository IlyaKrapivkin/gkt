import {
  Resolver,
  Query,
  Mutation,
  Authorized,
  Arg,
} from 'type-graphql'
import { getConnection } from 'typeorm'

import { USER_ROLE } from '../types'
import E_Person from 'entity/E_Person'
import Email from '../utility/Email'
import Phone from '../utility/Phone'
import Password from '../utility/Password'

@Resolver()
export default class Auth {

  @Authorized([
    USER_ROLE.guest,
  ])
  @Mutation(() => String)
  async signUp(
    @Arg('roleId') roleId: number,
    @Arg('login') login: string,
    @Arg('password') password: string,
    @Arg('loginReserve', { nullable: true }) loginReserve?: string,
  ): Promise<string> {
    const loginChecked = Email(login) || Phone(login, 0)
    const loginReserveChecked = Email(loginReserve) || Phone(loginReserve, 0)
    if (!loginChecked) {
      throw new Error('incorrect login')
    }
    if (loginReserve && !loginReserveChecked) {
      throw new Error('incorrect reserve login')
    }
    if (!Password(password)) {
      throw new Error('password should be latin and longer 5 symbols')
    }
    const loginReserveOption = loginReserveChecked ? {
      reserve: loginReserveChecked,
    } : {}
    const samePerson = await getConnection().getRepository(E_Person).findOne({
      where: [
        { login: loginChecked },
        { ...loginReserveOption },
      ]
    })
    if (samePerson) {
      if (samePerson.valid && !samePerson.deleteDate) {
        throw new Error('login already occupied')
      }
      await getConnection().getRepository(E_Person).update(
        { id: samePerson.id },
        {
          role: { id: roleId },
          updateDate: new Date(),
          deleteDate: null,
          login: loginChecked,
          reserve: loginReserveChecked,
          hash: '',
          valid: true,
        }
      )
    }
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
