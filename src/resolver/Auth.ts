import {
  Resolver,
  Query,
  Mutation,
  Authorized,
  Arg,
} from 'type-graphql'
import { getConnection } from 'typeorm'

import { USER_ROLE } from '../types'
import E_Person from '../entity/E_Person'
import E_Role from '../entity/E_Role'
import { Email } from '../utility/Email'
import { Phone } from '../utility/Phone'
import { Password } from '../utility/Password'
import { HashGen } from '../utility/Crypt'

@Resolver()
export default class Auth {

  @Authorized([
    USER_ROLE.guest,
  ])
  @Mutation(() => Boolean)
  async signUp(
    @Arg('roleId') roleId: number,
    @Arg('login') login: string,
    @Arg('password') password: string,
    @Arg('loginReserve', { nullable: true }) loginReserve?: string,
  ): Promise<boolean> {
    const dateCur = new Date()
    const loginChecked = Email(login) || Phone(login, 0)
    const loginReserveChecked = Email(loginReserve) || Phone(loginReserve, 0)
    if (!loginChecked) {
      throw new Error('incorrect login')
    }
    if (loginReserve && !loginReserveChecked) {
      throw new Error('incorrect loginReserve')
    }
    if (!Password(password)) {
      throw new Error('password should be [latin noSpaces >5symbols]')
    }
    const roles = await getConnection().getRepository(E_Role).find({
      where: {
        deleteDate: null,
      }
    })
    if (
      !roles.length ||
      !roles.find(role => role.id === roleId)
    ) {
      throw new Error('incorrect role id')
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
    const hashNew = HashGen(
      loginChecked,
      password,
    )
    if (samePerson) {
      if (samePerson.valid && !samePerson.deleteDate) {
        throw new Error('login already occupied')
      }
      await getConnection().getRepository(E_Person).update(
        { id: samePerson.id },
        {
          role: { id: roleId },
          updateDate: dateCur,
          deleteDate: null,
          login: loginChecked,
          reserve: loginReserveChecked || null,
          hash: hashNew,
          valid: true,
        }
      )
    } else {
      await getConnection().getRepository(E_Person).insert(
        {
          role: { id: roleId },
          deleteDate: null,
          login: loginChecked,
          reserve: loginReserveChecked || null,
          hash: hashNew,
          valid: true,
        }
      )
    }
    return true
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
