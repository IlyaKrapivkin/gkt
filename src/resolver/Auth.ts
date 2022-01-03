import {
  Resolver,
  Query,
  Mutation,
  Authorized,
  Arg,
  Ctx,
} from 'type-graphql'
import { getConnection } from 'typeorm'

import {
  USER_ROLE,
  CustomContext,
} from '../types'

import E_Person from '../entity/E_Person'
import E_Session from '../entity/E_Session'
import E_Role from '../entity/E_Role'

import { Email } from '../utility/Email'
import { Phone } from '../utility/Phone'
import { Password } from '../utility/Password'
import { HashGen, TokenGen } from '../utility/Crypt'

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
      !roles.find(role => (
          role.id === roleId &&
          [USER_ROLE.user, USER_ROLE.admin].includes(role.name)
        )
      )
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
          createDate: dateCur,
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
  @Mutation(() => String)
  async signIn(
    @Arg('login') login: string,
    @Arg('password') password: string,
  ): Promise<string> {
    const curDate = new Date()
    const loginChecked = Email(login) || Phone(login, 0)
    if (!Password(password)) {
      throw new Error('invalid format of password')
    }
    const hash = HashGen(
      loginChecked,
      password,
    )
    const person = await getConnection().getRepository(E_Person).findOne({
      where: {
        login: loginChecked,
        hash,
        deleteDate: null,
        valid: true,
      }
    })
    if (!person) {
      throw new Error('no person found')
    }
    const sessionUuidNew = TokenGen()
    await getConnection().getRepository(E_Session).insert({
      person: { id: person.id },
      token: sessionUuidNew,
    })
    return sessionUuidNew
  }

  @Authorized([
    USER_ROLE.user,
    USER_ROLE.admin,
  ])
  @Mutation(() => Boolean)
  async signOut(
    @Ctx('ctx') ctx: CustomContext,
  ): Promise<boolean> {
    const curDate = new Date()
    const session = await getConnection().getRepository(E_Session).findOne({
      relations: [
        'person',
      ],
      where: {
        token: ctx.sessionUuid,
        deleteDate: null,
      }
    })
    if (!session) {
      throw new Error('no session found')
    }
    if (
      session.person &&
      (
        session.person.deleteDate ||
        !session.person.valid
      )
    ) {
      throw new Error('no person found')
    }
    await getConnection().getRepository(E_Session).update(
      {
        id: session.id,
      },
      { deleteDate: curDate },
    )
    return true
  }

  @Authorized([
    USER_ROLE.user,
    USER_ROLE.admin,
  ])
  @Mutation(() => Boolean)
  async signOutAll(
    @Ctx('ctx') ctx: CustomContext,
  ): Promise<boolean> {
    const curDate = new Date()
    const session = await getConnection().getRepository(E_Session).findOne({
      relations: [
        'person',
      ],
      where: {
        token: ctx.sessionUuid,
        deleteDate: null,
      }
    })
    if (!session) {
      throw new Error('no session found')
    }
    if (
      session.person &&
      (
        session.person.deleteDate ||
        !session.person.valid
      ) ||
      !session.person
    ) {
      throw new Error('no person found')
    }
    await getConnection().getRepository(E_Session).update(
      {
        personId: session.personId,
        deleteDate: null,
      },
      { deleteDate: curDate },
    )
    return true
  }


}
